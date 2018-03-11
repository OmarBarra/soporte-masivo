import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITipoGrupo } from '../components/catalogos/tipo-grupo/tipo-grupo';

@Injectable()
export class TipoGrupoService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTipoGrupos(): Observable<ITipoGrupo[]> {
    return this.http.get(this.baseUrl + 'getTipoGrupo')
      .map(this.extractData)
      .do(data => console.log('getTipoGrupo: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTipoGrupo(id): Observable<ITipoGrupo[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getTipoGrupo?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getTipoGrupo: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteTipoGrupo(id: string): Observable<Object> {
    const url = this.baseUrl + 'setTipoGrupo';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "grupo":"deleted",
                    "activo":"0",
                    "descripcion":""
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateTipoGrupo(grupo: ITipoGrupo): Observable<Object> {
    const url = this.baseUrl + 'setTipoGrupo';
    const idCrud = grupo.ID_TIPO_GRUPO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${grupo.ID_TIPO_GRUPO}",
                    "grupo":"${grupo.GRUPO}",
                    "activo":"${grupo.ACTIVO}",
                    "descripcion":"${grupo.DESCRIPCION}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): ITipoGrupo[] {
    // Return an initialized object
    return [{
      ID_TIPO_GRUPO: 0,
      GRUPO: null,
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
