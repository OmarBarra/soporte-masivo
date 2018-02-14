import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BajaPlanComponent } from './baja-plan.component';
import { ValidaArchivoComponent } from './valida-archivo.component';
import { BajaPlanRoutingModule } from './baja-plan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BajaPlanRoutingModule
  ],
  declarations: [BajaPlanComponent, ValidaArchivoComponent]
})
export class BajaPlanModule { }
