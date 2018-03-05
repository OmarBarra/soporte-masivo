import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductoComponent } from './producto.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoService } from '../../../services/producto.service';
import { ProductoEditComponent } from './producto-edit.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductoRoutingModule
  ],
  declarations: [ProductoComponent, ProductoEditComponent],
  providers: [ProductoService]
})
export class ProductoModule { }
