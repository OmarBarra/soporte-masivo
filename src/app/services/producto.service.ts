import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProducto } from '../components/catalogos/producto/producto';

@Injectable()
export class ProductoService {
  private baseUrl = 'http://localhost:3000/api/catalogo/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProductos(): Observable<IProducto[]> {
    return this.http.get(this.baseUrl + 'getProducto')
      .map(this.extractData)
      .do(data => console.log('getProducto: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProducto(id): Observable<IProducto[]> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    return this.http.get(this.baseUrl + 'getProducto?id=' + id)
      .map(this.extractData)
      .do(data => console.log('getProducto: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteProducto(id: string): Observable<Object> {
    const url = this.baseUrl + 'setProducto';

    const body = `{
                    "idCrud":"3",
                    "id":${id},
                    "producto":"deleted",
                    "activo":"0",
                    "descripcion":""
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  updateProducto(producto: IProducto): Observable<Object> {
    const url = this.baseUrl + 'setProducto';
    const idCrud = producto.ID_PRODUCTO === 0 ? 1 : 2;

    const body = `{
                    "idCrud":"${idCrud}",
                    "id":"${producto.ID_PRODUCTO}",
                    "producto":"${producto.PRODUCTO}",
                    "activo":"${producto.ACTIVO}",
                    "descripcion":"${producto.DESCRIPCION}"
                  }`;

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleError);
  }

  initializeProduct(): IProducto[] {
    // Return an initialized object
    return [{
      ID_PRODUCTO: 0,
      PRODUCTO: null,
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
