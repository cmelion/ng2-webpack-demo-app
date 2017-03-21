# Demo Docker Workflow for [generator-ng2-webpack](https://github.com/cmelion/generator-ng2-webpack)

A Docker based workflow is a little different from the typical `npm install` followed by `npm start`  routine.
There is no local node_modules folder and all npm modules used are global modules (for more info see [sample docker workflow](https://github.com/cmelion/generator-ng2-webpack/wiki/Sample-Docker-Workflow) ).

Steps:
* Open a terminal
* `npm install -g docker-run` which adds support for [running docker from npm](https://github.com/mafintosh/docker-run)
* `npm run docker-start` from a terminal or use the npm tool window
* Once processing completes, open a browser window at http://localhost:2368
* Make some changes in ng2-webpack-demo-app/src/app/components/home/template.html
* Observe that your changes are reflected in the browser without having to refresh


Use npm to run sub-generators.
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

This workflow serves as a starting point for building component based Angular 2.0/React applications using Webpack. 



### Quick start


```bash

# change directory to your app
$ cd my-app

# start the server
$ npm start

# if you have docker installed
$ docker-compose up
```

go to [http://localhost:2368](http://localhost:2368) in your browser.

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

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm run docker-start
```

It will start a server using `webpack-dev-server` in a docker container which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:2368`.

## Developing in the Docker container
* run `docker exec -it ${PWD##*/} /bin/bash` in a terminal window

### Build files

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`
