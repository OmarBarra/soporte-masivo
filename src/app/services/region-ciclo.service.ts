import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRegionCiclo } from '../components/catalogos/region-ciclo/region-ciclo';

@Injectable()
export class RegionCicloService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getRegionCiclos(): Observable<IRegionCiclo[]> {
    return this.http.get(this.baseUrl + 'getRegionCiclo')
      .map(this.extractData)
      .do(data => console.log('getRegionCiclo: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRegionCiclo(id): Observable<IRegionCiclo[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getRegionCiclo?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getRegionCiclo: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteRegionCiclo(id: string): Observable<Object> {
    const url = this.baseUrl + 'setRegionCiclo';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "idRegion":"0",
                    "idCiclo":"0"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateRegionCiclo(regionCiclo: IRegionCiclo): Observable<Object> {
    const url = this.baseUrl + 'setRegionCiclo';
    const idCrud = regionCiclo.ID_REGION_CICLO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${regionCiclo.ID_REGION_CICLO}",
                    "idRegion":"${regionCiclo.ID_REGION}",
                    "idCiclo":"${regionCiclo.ID_CICLO}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): IRegionCiclo[] {
    // Return an initialized object
    return [{
      ID_REGION_CICLO: 0,
      ID_REGION: 0,
      ID_CICLO: 0
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
