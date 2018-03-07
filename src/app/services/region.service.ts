import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRegion } from '../components/catalogos/region/region';

@Injectable()
export class RegionService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getRegiones(): Observable<IRegion[]> {
    return this.http.get(this.baseUrl + 'getRegiones')
      .map(this.extractData)
      .do(data => console.log('getRegiones: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRegion(id): Observable<IRegion[]> {
    if (id === 0) {
      return Observable.of(this.initializeRegion());
    }

    return this.http.get(this.baseUrl + 'getRegiones?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getRegiones: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteRegiones(id: string): Observable<Object> {
    const url = this.baseUrl + 'setRegiones';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "region":"deleted",
                    "activo":"0"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateRegion(region: IRegion): Observable<Object> {
    const url = this.baseUrl + 'setRegiones';
    const idCrud = region.ID_REGION === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${region.ID_REGION}",
                    "region":"${region.REGION}",
                    "activo":"${region.ACTIVO}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeRegion(): IRegion[] {
    // Return an initialized object
    return [{
      ID_REGION: 0,
      REGION: null,
      ACTIVO: null
    }];
  }

  private extractData(response) {
    return response.data || {};
  }

  private extractRowsAffected(response) {
    return response.rowsAffected || {};
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
