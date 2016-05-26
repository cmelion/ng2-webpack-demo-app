/*
*  TODO:  Figure out why this prevents file-sync and hot-loading
*  https://github.com/mafintosh/docker-run/issues/9
*/
var run = require('docker-run');

var image = 'cmelion/generator-ng2-webpack:latest';
var cwd = process.cwd();
var options =  {
    name: cwd.split('/').pop(),
    ports: {
        2368: 2368
    },
    tty: false,
    volumes: {
        [cwd + '/package.json']: '/home/yeoman/client/package.json',
        [cwd + '/api']: '/home/yeoman/client/api',
        [cwd + '/config']: '/home/yeoman/client/config',
        [cwd + '/src']: '/home/yeoman/client/src'
    }
};

var child = run(image, options);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);