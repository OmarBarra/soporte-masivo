import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesoComponent } from './proceso.component';
import { ProcesoEditComponent } from './proceso-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcesoRoutingModule } from '../proceso/proceso-routing.module';
import { ProcesoService } from '../../../services/proceso.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcesoRoutingModule
  ],
  declarations: [ProcesoComponent, ProcesoEditComponent],
  providers: [ProcesoService]
})
export class ProcesoModule { }
