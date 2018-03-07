import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region.component';
import { RegionEditComponent } from './region-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegionRoutingModule } from '../region/region-routing.module';
import { RegionService } from '../../../services/region.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegionRoutingModule
  ],
  declarations: [RegionComponent, RegionEditComponent],
  providers: [RegionService]
})
export class RegionModule { }
