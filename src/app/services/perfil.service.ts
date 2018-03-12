import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class PerfilService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPerfiles(): Observable<IPerfil[]> {
    return this.http.get(this.baseUrl + 'getPerfil')
      .map(this.extractData)
      .do(data => console.log('getPerfil: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPerfil(id): Observable<IPerfil[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getPerfil?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getPerfils: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

//   deletePerfil(id: string): Observable<Object> {
//     const url = this.baseUrl + 'setPerfil';

//     const body = `{
//                     "idCrud":"3",
//                     "id":${id},
//                     "perfil":"deleted",
//                     "descripcion":"0"
//                   }`;

//     return this.http.post(url, body, { headers: this.headers })
//       .catch(this.handleError);
//   }

//   updatePerfil(perfil: IPerfil): Observable<Object> {
//     const url = this.baseUrl + 'setPerfil';
//     const idCrud = perfil.ID_PERFIL === 0 ? 1 : 2;

//     const body = `{
//                     "idCrud":"${idCrud}",
//                     "id":"${perfil.ID_PERFIL}",
//                     "perfil":"${perfil.PERFIL}",
//                     "descripcion":"${perfil.DESCRIPCION}"
//                   }`;

//     return this.http.post(url, body, { headers: this.headers })
//       .catch(this.handleError);
//   }

  initializeProduct(): IPerfil[] {
    // Return an initialized object
    return [{
      ID_PERFIL: 0,
      PERFIL: null,
      DESCRIPCION: null
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

export interface IPerfil {
    ID_PERFIL: number;
    PERFIL: string;
    DESCRIPCION: string;
}
