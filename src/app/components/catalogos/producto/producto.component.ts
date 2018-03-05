import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoService } from '../../../services/producto.service';
import { IProducto } from './producto';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  animations: [routerTransition()]
})
export class ProductoComponent implements OnInit {
  productos: IProducto[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _productoService: ProductoService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
  }

  expandPanel = (panel): void => {
    console.log(panel);
    switch (panel) {
      case 'success':
        console.log(1);
        this.expandSuccess = true;
        this.expandError = false;
        break;
      case 'error':
        console.log(2);
        this.expandSuccess = false;
        this.expandError = true;
        break;
      default:
        console.log(3);
        this.expandError = false;
        this.expandSuccess = false;
        break;
    }
  }

  deleteProducto(id: string): void {
    const producto = this.productos.find(x => x.ID_PRODUCTO === +id);

    if (confirm(`Borrar el producto: ${producto.PRODUCTO}?`)) {
      this._productoService.deleteProducto(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getProductos();
    alert('Producto eliminado');
  }

  getProductos() {
    this._productoService.getProductos()
      .subscribe(
        productos => this.productos = productos,
        error => this.errorMessage = <any>error
      );
  }
}
