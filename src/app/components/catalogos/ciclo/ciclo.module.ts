import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CicloComponent } from './ciclo.component';
import { CicloEditComponent } from './ciclo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CicloRoutingModule } from '../ciclo/ciclo-routing.module';
import { CicloService } from '../../../services/ciclo.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CicloRoutingModule
  ],
  declarations: [CicloComponent, CicloEditComponent],
  providers: [CicloService]
})
export class CicloModule { }
