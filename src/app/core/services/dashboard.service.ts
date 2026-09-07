import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../config/env';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${env.API_BASE_URL}`;

  constructor() { }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/stats`);
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/notifications`);
  }
}
