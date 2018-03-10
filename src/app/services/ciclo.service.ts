import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ICiclo } from '../components/catalogos/ciclo/ciclo';

@Injectable()
export class CicloService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCiclos(): Observable<ICiclo[]> {
    return this.http.get(this.baseUrl + 'getCiclos')
      .map(this.extractData)
      .do(data => console.log('getCiclo: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCiclo(id): Observable<ICiclo[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getCiclos?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getCiclos: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteCiclo(id: string): Observable<Object> {
    const url = this.baseUrl + 'setCiclos';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "ciclo":"deleted",
                    "activo":"0",
                    "descripcion":""
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateCiclo(ciclo: ICiclo): Observable<Object> {
    const url = this.baseUrl + 'setCiclos';
    const idCrud = ciclo.ID_CICLO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${ciclo.ID_CICLO}",
                    "ciclo":"${ciclo.CICLO}",
                    "activo":"${ciclo.ACTIVO}",
                    "descripcion":"${ciclo.DESCRIPCION}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): ICiclo[] {
    // Return an initialized object
    return [{
      ID_CICLO: 0,
      CICLO: null,
      DESCRIPCION: null,
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
