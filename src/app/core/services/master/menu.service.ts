import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../config/env';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly http = inject(HttpClient);

  private readonly controller =
    `${env.API_BASE_URL}`;

  constructor() { }

  getSidebar(): Observable<any> {

    return this.http.get<any>(
      `${this.controller}/admin/sidebar`
    );

  }

}