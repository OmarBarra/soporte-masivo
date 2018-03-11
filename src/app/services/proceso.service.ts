import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProceso } from '../components/catalogos/proceso/proceso';

@Injectable()
export class ProcesoService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProcesos(): Observable<IProceso[]> {
    return this.http.get(this.baseUrl + 'getProceso')
      .map(this.extractData)
      .do(data => console.log('getProceso: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProceso(id): Observable<IProceso[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getProceso?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getProceso: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteProceso(id: string): Observable<Object> {
    const url = this.baseUrl + 'setProceso';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "proceso":"deleted",
                    "code":"0",
                    "comentario":""
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateProceso(proceso: IProceso): Observable<Object> {
    const url = this.baseUrl + 'setProceso';
    const idCrud = proceso.ID_PROCESO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${proceso.ID_PROCESO}",
                    "proceso":"${proceso.PROCESO}",
                    "code":"${proceso.CODE}",
                    "comentario":"${proceso.COMENTARIO}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): IProceso[] {
    // Return an initialized object
    return [{
      ID_PROCESO: 0,
      PROCESO: null,
      CODE: null,
      COMENTARIO: null
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
