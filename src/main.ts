import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { GlobalErrorHandler } from './app/shared/error/global-error-handler';
import { httpErrorInterceptor } from './app/shared/interceptors/http-error-interceptor';
import { jwtInterceptor } from './app/shared/interceptors/jwt-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor, jwtInterceptor])),
    FileOpener,
    File,
  ],
});
