import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service.ts';
import { HttpClient } from '@angular/common/http';
import { env } from '../config/env.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${env.API_BASE_URL}`;

  private readonly storageService = inject(StorageService);

  private currentUserSubject = new BehaviorSubject<any>(
    this.storageService.getUser()
  );

  currentUser$ = this.currentUserSubject.asObservable();

  // login(email: string, password: string): Observable<any> {

  //   return this.http.post<any>(

  //     `${this.baseUrl}/admin/login`,

  //     {

  //       email,

  //       password

  //     }

  //   ).pipe(

  //     tap((response) => {

  //       this.storageService.setAccessToken(
  //         response.data.accessToken
  //       );

  //       this.storageService.setRefreshToken(
  //         response.data.refreshToken
  //       );

  //       this.storageService.setUser(
  //         response.data.user
  //       );

  //       this.currentUserSubject.next(
  //         response.data.user
  //       );

  //     })


  //   );

  // }

  login(email: string, password: string): Observable<any> {

    // =====================================================
    // DEMO LOGIN (TEMPORARY)
    // =====================================================
    // Backend login is kept below in comments.
    // Uncomment it after all master modules are completed.
    // =====================================================

    if (email === 'admin' && password === 'admin123') {

      const response = {

        success: true,

        data: {

          accessToken: 'demo-access-token',

          refreshToken: 'demo-refresh-token',

          expiresIn: '15m',

          user: {

            id: 1,

            employeeCode: 'EMP000001',

            firstName: 'Super',

            lastName: 'Admin',

            email: 'admin@pace.com',

            adminTypeId: 1,

            adminStatusId: 1

          }

        }

      };

      this.storageService.setAccessToken(
        response.data.accessToken
      );

      this.storageService.setRefreshToken(
        response.data.refreshToken
      );

      this.storageService.setUser(
        response.data.user
      );

      this.currentUserSubject.next(
        response.data.user
      );

      return of(response);

    }

    return of({

      success: false,

      message: 'Invalid Username or Password'

    });

    // =====================================================
    // PRODUCTION LOGIN
    // Uncomment after Admin module is completed.
    // =====================================================

    /*
    return this.http.post<any>(
        `${this.baseUrl}/admin/login`,
        {
          email,
          password
        }
    ).pipe(
  
        tap((response) => {
  
            this.storageService.setAccessToken(
                response.data.accessToken
            );
  
            this.storageService.setRefreshToken(
                response.data.refreshToken
            );
  
            this.storageService.setUser(
                response.data.user
            );
  
            this.currentUserSubject.next(
                response.data.user
            );
  
        })
  
    );
    */

  }

  isLoggedIn(): boolean {

    return !!this.storageService.getAccessToken();

  }

  refreshToken(): Observable<any> {

    const refreshToken =

      this.storageService.getRefreshToken();

    return this.http.post<any>(

      `${this.baseUrl}/admin/refresh-token`,

      {

        refreshToken

      }

    ).pipe(

      tap((response) => {

        if (response.success) {

          this.storageService.setAccessToken(

            response.data.accessToken

          );

        }

      })

    );

  }

  logout(): void {

    this.storageService.clear();

    this.currentUserSubject.next(null);

  }

  getProfile(): Observable<any> {

    return this.http.get<any>(
      `${this.baseUrl}/admin/me`
    ).pipe(

      tap((response) => {

        if (response.success) {

          this.storageService.setUser(
            response.data
          );

          this.currentUserSubject.next(
            response.data
          );

        }

      })

    );

  }
  loadCurrentUser(): void {

    this.getProfile()

      .subscribe({

        next: (response) => {

          if (response.success) {

            this.storageService.setUser(

              response.data

            );

            this.currentUserSubject.next(

              response.data

            );

          }

        },

        error: () => {

          this.logout();

        }

      });

  }

  getAccessToken(): string | null {

    return this.storageService.getAccessToken();

  }

  getRefreshToken(): string | null {

    return this.storageService.getRefreshToken();

  }

  getCurrentUser() {

    return this.currentUser$;

  }

}
