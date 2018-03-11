import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoGrupoComponent } from './tipo-grupo.component';
import { TipoGrupoEditComponent } from './tipo-grupo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoGrupoRoutingModule } from '../tipo-grupo/tipo-grupo-routing.module';
import { TipoGrupoService } from '../../../services/tipo-grupo.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TipoGrupoRoutingModule
  ],
  declarations: [TipoGrupoComponent, TipoGrupoEditComponent],
  providers: [TipoGrupoService]
})
export class TipoGrupoModule { }
