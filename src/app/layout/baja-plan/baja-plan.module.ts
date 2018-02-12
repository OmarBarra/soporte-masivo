import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BajaPlanComponent } from './baja-plan.component';
import { BajaPlanRoutingModule } from './baja-plan-routing.module';
import { ValidaArchivoComponent } from './valida-archivo.component';

@NgModule({
  imports: [
    CommonModule,
    BajaPlanRoutingModule
  ],
  declarations: [BajaPlanComponent, ValidaArchivoComponent]
})
export class BajaPlanModule { }
