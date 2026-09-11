import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { env } from '../../config/env';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly controller =
    `${env.API_BASE_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get sidebar menu
   */
  getSidebar(): Observable<any> {

    console.log(
      'SIDEBAR API:',
      `${this.controller}/admin/sidebar`
    );

    return this.http.get<any>(
      `${this.controller}/admin/sidebar`
    );

  }

}