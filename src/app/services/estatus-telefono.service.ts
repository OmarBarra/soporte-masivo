import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEstatusTelefono } from '../components/catalogos/estatus-telefono/estatus-telefono';

@Injectable()
export class EstatusTelefonoService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getEstatusTelefonos(): Observable<IEstatusTelefono[]> {
    return this.http.get(this.baseUrl + 'getEstatusTelefono')
      .map(this.extractData)
      .do(data => console.log('getEstatusTelefono: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEstatusTelefono(id): Observable<IEstatusTelefono[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getEstatusTelefono?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getEstatusTelefono: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteEstatusTelefono(id: string): Observable<Object> {
    const url = this.baseUrl + 'setEstatusTelefono';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "estatus":"deleted",
                    "activo":"0",
                    "descripcion":""
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateEstatusTelefono(estatus: IEstatusTelefono): Observable<Object> {
    const url = this.baseUrl + 'setEstatusTelefono';
    const idCrud = estatus.ID_ESTATUS_TELEFONO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${estatus.ID_ESTATUS_TELEFONO}",
                    "estatus":"${estatus.ESTATUS}",
                    "activo":"${estatus.ACTIVO}",
                    "descripcion":"${estatus.DESCRIPCION}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): IEstatusTelefono[] {
    // Return an initialized object
    return [{
      ID_ESTATUS_TELEFONO: 0,
      ESTATUS: null,
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
