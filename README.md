# Demo Docker Workflow for [generator-ng2-webpack](https://github.com/cmelion/generator-ng2-webpack)

You have access to the following sub generators:
* **yo ng2-webpack:service** (Creates a service)
* **yo ng2-webpack:pipe** (Creates a pipe)
* **yo ng2-webpack:component** (Creates a component)
* **yo ng2-webpack:directive** (Creates a directive)
* **yo ng2-webpack:interface** (Creates an interface)

You may prefer to use npm to run your sub-generators.
For a complete list of available commands and to add tab auto-completion, run the following commands in a terminal:

    $ npm completion >> ~/.bashrc
    $ source ~/.bashrc
    $ npm run <tab><tab>
    
which will produce the following output    
```

build                 docker-open-terminal  e2e-live              new-service           watch
ci                    docker-server         lint                  postinstall           webdriver-start
clean                 docker-start          new-component         server                webdriver-update
clean-install         docker-stop           new-directive         start                 
clean-start           docs                  new-interface         test                  
delayed-open          e2e                   new-pipe              test-watch    
 
```

This workflow serves as a starting point for building component based Angular 2.0 applications using Webpack. 

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm scripts.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start


```bash

# change directory to your app
$ cd my-app

# start the server
$ npm start
```

go to [http://localhost:8080](http://localhost:8080) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [File Structure](#file-structure)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [License](#license)

# Getting Started

## File Structure

```
├── app/                            * top level web app component folder
│   ├── components/                 * subcomponents
│   │   ├── about/                  * example page level component folder
│   │   │   ├── index.async.ts      * .async indicates that the component will be asychronously loaded
│   │   │   ├── spec.ts             * unit test
│   │   │   ├── style.scss          * css styles, could be css, less or sass
│   │   │   └── template.html       * component's html template
│   │   └── home/                   * example main page level component
│   │       ├── e2e.js              * end-to-end test for home
│   │       ├── index.ts            * a simple synchronous component
│   │       ├── spec.ts             * 
│   │       ├── style.scss          * 
│   │       └── template.html       * 
│   ├── e2e.js                      * end-to-end test for the app component
│   ├── index.ts                    * the app component
│   ├── root.spec.ts                * the main entry point for hierarchically nested tests.
│   ├── services/                   * app level service folder
│   │   └── api/                    * example application level service folder
│   │       ├── index.ts            * example service
│   │       └── spec.ts             * unit test associated with example service
│   ├── style.scss                  * application component specific styles
│   └── template.html               * application component html template
├── bootstrap.ts                    * application entry point (bootstrap)
├── public/                         * static public facing resources
│   ├── img/                        * global/top level icons and images
│   └── index.html                  * the html index page where it all starts
├── shims/                          * shims an polyfills for non-compliant browsers
│   └── shims_for_IE.js             * sample shim
├── style/                          * 
│   └── app.scss                    * styles required by the index page
└── vendor.ts                       * this is where we import shims/polyfills and core third party libraries
```

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `npm run build`
* build files and watch: `npm run watch`

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`
