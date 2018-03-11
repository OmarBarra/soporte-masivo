import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatusTelefonoComponent } from './estatus-telefono.component';
import { EstatusTelefonoEditComponent } from './estatus-telefono-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstatusTelefonoRoutingModule } from '../estatus-telefono/estatus-telefono-routing.module';
import { EstatusTelefonoService } from '../../../services/estatus-telefono.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstatusTelefonoRoutingModule
  ],
  declarations: [EstatusTelefonoComponent, EstatusTelefonoEditComponent],
  providers: [EstatusTelefonoService]
})
export class EstatusTelefonoModule { }
