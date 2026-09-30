import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../config/env';

@Injectable({
  providedIn: 'root',
})
export class AssetInformationService {

  private readonly http = inject(HttpClient);

  private readonly controller =
    `${env.API_BASE_URL}`;

  constructor() { }

  getList(payload: any): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', payload.pageNumber)
      .set('pageSize', payload.pageSize);
    if (payload.search && payload.search.trim() !== '') {
      params = params.set('search', payload.search);
    }
    return this.http.get(
      `${this.controller}/asset-information`,
      { params }
    );
  }

  fetchAll(): Observable<any> {
    return this.http.get(
      `${this.controller}/asset-information`
    );
  }
}
