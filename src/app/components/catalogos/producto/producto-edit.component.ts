import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductoService } from '../../../services/producto.service';
import { routerTransition } from '../../shared/router.animations';
import { IProducto } from './producto';


@Component({
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss'],
  animations: [routerTransition()]
})
export class ProductoEditComponent implements OnInit {

  pageTitle = 'Product Edit';
  errorMessage: string;
  productForm: FormGroup;

  producto: IProducto[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private _productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      PRODUCTO: ['', Validators.required],
      DESCRIPCION: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProducto(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getProducto(id) {
    this._productoService.getProducto(id)
      .subscribe(
        producto => this.onProductRetrieved(producto[0]),
        error => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(producto: IProducto): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.producto[0] = producto;

    if (this.producto[0].ID_PRODUCTO === 0) {
      this.pageTitle = 'Agregar Producto';
    } else {
      this.pageTitle = `Editar Producto: ${this.producto[0].DESCRIPCION}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      PRODUCTO: this.producto[0].PRODUCTO,
      DESCRIPCION: this.producto[0].DESCRIPCION,
      ACTIVO: this.producto[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the product object values
      const p = Object.assign({}, this.producto[0], this.productForm.value);

      this._productoService.updateProducto(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/producto']);
  }
}
