import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../config/env';

@Injectable({
  providedIn: 'root',
})
export class CloudSubscriptionManagementServices {

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
      `${this.controller}/cloud-subscription-management`,
      { params }
    );

  }

  fetchAll(): Observable<any> {

    return this.http.get(

      `${this.controller}/cloud-subscription-management`

    );

  }

  add(payload: any): Observable<any> {

    return this.http.post(
      `${this.controller}/cloud-subscription-management/`,
      payload
    );

  }

  getByIdData(id: number): Observable<any> {

    return this.http.get(
      `${this.controller}/cloud-subscription-management/${id}`
    );

  }

  update(id: number, payload: any): Observable<any> {

    return this.http.put(
      `${this.controller}/cloud-subscription-management/${id}`,
      payload
    );

  }

  delete(id: number): Observable<any> {

    return this.http.delete(

      `${this.controller}/cloud-subscription-management/${id}`

    );

  }

}
