import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegionCicloComponent } from './region-ciclo.component';
import { RegionCicloEditComponent } from './region-ciclo-edit.component';
import { RegionCicloService } from '../../../services/region-ciclo.service';
import { RegionCicloRoutingModule } from './region-ciclo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegionCicloRoutingModule
  ],
  declarations: [RegionCicloComponent, RegionCicloEditComponent],
  providers: [RegionCicloService]
})
export class RegionCicloModule { }
