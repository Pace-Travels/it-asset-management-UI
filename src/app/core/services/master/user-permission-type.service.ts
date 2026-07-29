import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { env } from '../../config/env';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionTypeService {

  private readonly http = inject(HttpClient);

  private readonly controller =
    `${env.API_BASE_URL}`;

  constructor() { }

  getList(payload: any): Observable<any> {

    let params = new HttpParams()
      .set('pageNumber', payload.pageNumber)
      .set('pageSize', payload.pageSize);

    // Search sirf tab bhejo jab value ho
    if (payload.search && payload.search.trim() !== '') {
      params = params.set('search', payload.search);
    }

    return this.http.get(
      `${this.controller}/master-Common-module/permission-type`,
      { params }
    );

  }

  add(payload: any): Observable<any> {

    return this.http.post(
      `${this.controller}/master-Common-module/permission-type/`,
      payload
    );

  }

  getByIdData(id: number): Observable<any> {

    return this.http.get(
      `${this.controller}/master-Common-module/permission-type/${id}`
    );

  }

  update(id: number, payload: any): Observable<any> {

    return this.http.put(
      `${this.controller}/master-Common-module/permission-type/${id}`,
      payload
    );

  }

  delete(id: number): Observable<any> {

    return this.http.delete(

      `${this.controller}/master-Common-module/permission-type/${id}`

    );

  }

}
