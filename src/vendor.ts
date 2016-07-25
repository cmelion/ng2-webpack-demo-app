// Polyfills
// fixes for non ES6 browsers (IE, safari, ...)
// Polyfills
import 'es6-shim';
import 'reflect-metadata';
import 'material-design-lite/src/mdlComponentHandler.js';
import 'material-design-lite/src/button/button';
import 'material-design-lite/src/layout/layout';
import 'material-design-lite/src/ripple/ripple';
import 'material-design-lite/src/textfield/textfield';
require('zone.js/dist/zone');


// Angular 2
import '@angular/platform-browser';
import '@angular/core';
import '@angular/router-deprecated';
import '@angular/http';

// RxJS
import 'rxjs';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
