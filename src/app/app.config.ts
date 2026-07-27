import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AppInitService } from './core/services/app-init.service.ts';

export const appConfig: ApplicationConfig = {

  providers: [

    provideHttpClient(

      withInterceptors([authInterceptor])

    ),

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideAnimations(),

    providePrimeNG({

      theme: {

        preset: Aura

      }

    }),

    MessageService,

    provideAppInitializer(() => {

      const appInitService = inject(AppInitService);

      return appInitService.initialize();

    })

  ]

};