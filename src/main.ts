/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import routeConfig from "./app/routes";
import {App} from './app/app';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient()]}).catch((err) =>
  console.error(err),
);
