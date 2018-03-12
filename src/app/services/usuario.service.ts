import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUsuario } from '../components/catalogos/usuario/usuario';

@Injectable()
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get(this.baseUrl + 'getUsuario')
      .map(this.extractData)
      .do(data => console.log('getUsuario: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUsuario(id): Observable<IUsuario[]> {
    if (id === 0) {
      return Observable.of(this.initializeUsuario());
    }

    return this.http.get(this.baseUrl + 'getUsuario?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getUsuario: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteUsuario(id: string): Observable<Object> {
    const url = this.baseUrl + 'setUsuario';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "idPerfil":"0",
                    "usuario":"deleted",
                    "activo":"0"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateUsuario(usuario: IUsuario): Observable<Object> {
    const url = this.baseUrl + 'setUsuario';
    const idCrud = usuario.ID_USUARIO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${usuario.ID_USUARIO}",
                    "idPerfil":"${usuario.ID_PERFIL}",
                    "usuario":"${usuario.USUARIO}",
                    "activo":"${usuario.ACTIVO}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeUsuario(): IUsuario[] {
    // Return an initialized object
    return [{
      ID_USUARIO: 0,
      ID_PERFIL: 0,
      USUARIO: null,
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
