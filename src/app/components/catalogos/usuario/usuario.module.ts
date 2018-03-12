import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario.component';
import { UsuarioEditComponent } from './usuario-edit.component';
import { UsuarioRoutingModule } from '../usuario/usuario-routing.module';
import { UsuarioService } from '../../../services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ],
  declarations: [UsuarioComponent, UsuarioEditComponent],
  providers: [UsuarioService]
})
export class UsuarioModule { }
