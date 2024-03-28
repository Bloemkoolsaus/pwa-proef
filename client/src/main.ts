import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import { AppComponent } from './app/app.component';

import routeConfig from './app/app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
}).catch((err) => console.error(err));
