'use strict';

// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var DEFAULT_TARGET = 'app';
var target = process.env.TARGET || DEFAULT_TARGET;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args]; }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val;
        }));
    }, ['']);
}

module.exports = (function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};
    var isTestEnv = ENV === 'test' || ENV === 'test-watch';

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTestEnv) {
        config.devtool = 'inline-source-map';
    } else if (ENV === 'build') {
        config.devtool = false;
    } else {
        config.devtool = 'cheap-module-eval-source-map';
    }

    // add debug messages
    config.debug = ENV !== 'build' || !isTestEnv;

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = isTestEnv ? {} : {
        'vendor': './src/vendor.ts',
        'app': './src/bootstrap.ts' // our angular app
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = isTestEnv ? {} : {
        path: root('dist'),
        publicPath: '',
        filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: ENV === 'build' ? '[id].[hash].chunk.js' : '[id].chunk.js',
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        cache: !isTestEnv,
        root: root(),
        // only discover files that have those extensions
        extensions: prepend(['.ts', '.tsx','.js','.json','.css', '.scss', '.html'], '.async'), // ensure .async.ts etc also works
        alias: {
            'app': 'src/app',
            'common': 'src/common'
        }
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        preLoaders: isTestEnv ? [] : [{test: /\.ts$/, loader: 'tslint'}],
        loaders: [

            // Support Angular 2 async routes via .async.ts
            {
                test: /\.async\.ts$/,
                loaders: ['es6-promise-loader', 'ts-loader'],
                exclude: [!isTestEnv ? /\.(spec|e2e)\.ts$/ : /\.async\.ts$/, /\.(spec|e2e)\.ts$/]
            },

            // Support for .ts files.
            {
                test: /\.tsx?$/,
                loader: 'ts',
                query: {
                    'ignoreDiagnostics': [
                        2300, // 2300 -> Duplicate identifier
                        2306, // 2300 -> Not a Module
                        2339, // 2339 -> Property 'decorate' does not exist on type 'typeof Reflect'
                        2347, // 2347 -> Untyped function calls may not accept type arguments
                        2364, // 2364 -> Invalid left-hand side of assignment expression
                        2374, // 2374 -> Duplicate number index signature
                        2375, // 2375 -> Duplicate string index signature
                        2403, // 2403 -> Subsequent variable declarations
                        2502  // 2502 -> Referenced directly or indirectly
                    ]
                },
                exclude: [isTestEnv ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            // copy those assets to output
            {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=[path][name].[ext]?[hash]'},

            // Support for *.json files.
            {test: /\.json$/, loader: 'json'},

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: isTestEnv ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            // all css required in src/app files will be merged in js files
            {test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss'},

            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                loader: isTestEnv ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            },
            // all css required in src/app files will be merged in js files
            {test: /\.scss$/, exclude: root('src', 'style'), loader: 'raw!postcss!sass'},

            // support for .html as raw text
            // suggest changing the loader to something that adds a hash to images
            {test: /\.html$/, loader: 'raw'}
        ],
        postLoaders: [],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    };

    if (isTestEnv) {
        // instrument only testing sources with Istanbul, covers js compiled files for now :-/
        config.module.postLoaders.push({
            test: /\.(js|ts)$/,
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV),
                NODE_ENV: JSON.stringify(ENV === 'build' ? 'production' : 'development')
            }
        }),

        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body',
            title: 'App - ' + target
        })
    ];

    if (!isTestEnv) {
        config.plugins.push(
            // Generate common chunks if necessary
            // Reference: https://webpack.github.io/docs/code-splitting.html
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            new CommonsChunkPlugin({
                name: 'vendor',
                filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
                minChunks: Infinity
            }),
            new CommonsChunkPlugin({
                name: 'common',
                filename: ENV === 'build' ? 'js/[name].[hash].js' : 'js/[name].js',
                minChunks: 2,
                chunks: ['app', 'vendor']
            }),

            // Inject script and link tags into html files
            // Reference: https://github.com/ampedandwired/html-webpack-plugin

            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body',
                title: 'App - ' + target,
                chunksSortMode: function compare(a, b) {
                    // common always first
                    if (a.names[0] === 'common') {
                        return -1;
                    }
                    // app always last
                    if (a.names[0] === 'app') {
                        return 1;
                    }
                    // vendor before app
                    if (a.names[0] === 'vendor' && b.names[0] === 'app') {
                        return -1;
                    } else {
                        return 1;
                    }
                    // a must be equal to b
                    /* eslint-disable no-unreachable */
                    return 0;
                    /* eslint-disable no-unreachable */
                }
            }),

            // Extract css files
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin('css/[name].[hash].css', {disable: ENV !== 'build'})
        );
    }

    // Add build specific plugins
    if (ENV === 'build') {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({
                // to debug prod builds uncomment //debug lines and comment //prod lines

                // beautify: true,//debug
                // mangle: false,//debug
                // dead_code: false,//debug
                // unused: false,//debug
                // deadCode: false,//debug
                // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
                // comments: true,//debug

                beautify: false,//prod
                // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
                // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
                // mangle: { screw_ie8 : true },//prod
                mangle: {
                    screw_ie8 : true,
                    except: ['RouterLink'] // needed for uglify RouterLink problem
                },// prod
                compress : { screw_ie8 : true },//prod
                comments: false//prod
            }),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: root('src/public')
            }])
        );
    }

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files to .css
     */
    config.sassLoader = {
        //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
    };

    /**
     * Apply the tslint loader as pre/postLoader
     * Reference: https://github.com/wbuchwalter/tslint-loader
     */
    config.tslint = {
        emitErrors: false,
        failOnHint: false
    };

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/public',
        historyApiFallback: true,
        stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}());
