import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiAddressInterceptor } from './interceptor/api-address.interceptor';
import { withCredentialsInterceptor } from './interceptor/credentials.interceptor';
import { handleErrorInterceptor } from './interceptor/error-handle.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([apiAddressInterceptor, withCredentialsInterceptor, handleErrorInterceptor])
    )
  ]
};
