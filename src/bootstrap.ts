/// <reference path="../typings/main.d.ts"/>

import {enableProdMode} from "angular2/core";
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'prod') {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/index';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
    return bootstrap(App, [
        // These are dependencies of our App
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...ENV_PROVIDERS
    ])
        .catch(err => console.error(err));
});


/*
 * Modified for using hot module reload
 */

// typescript lint error 'Cannot find name "module"' fix
declare let module: any;

// activate hot module reload
if (module.hot) {

    // bootstrap must not be called after DOMContentLoaded,
    // otherwise it cannot be rerenderd after module replacement
    //
    // for testing try to comment the bootstrap function,
    // open the dev tools and you'll see the reloader is replacing the module but cannot rerender it
    bootstrap(App, [
        ...ENV_PROVIDERS,
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS
    ])
        .catch(err => console.error(err));

    module.hot.accept();
}
