import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';

import { StorageService } from '../services/storage.service.ts';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (

  req,

  next

) => {

  const storageService = inject(StorageService);

  const authService = inject(AuthService);

  const accessToken = storageService.getAccessToken();

  if (accessToken) {

    req = req.clone({

      setHeaders: {

        Authorization: `Bearer ${accessToken}`

      }

    });

  }

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (

        error.status === 401 &&

        storageService.getRefreshToken()

      ) {

        return authService.refreshToken().pipe(

          switchMap(() => {

            const newAccessToken =

              storageService.getAccessToken();

            const clonedRequest = req.clone({

              setHeaders: {

                Authorization: `Bearer ${newAccessToken}`

              }

            });

            return next(clonedRequest);

          }),

          catchError(() => {

            authService.logout();

            return throwError(() => error);

          })

        );

      }

      return throwError(() => error);

    })

  );

};