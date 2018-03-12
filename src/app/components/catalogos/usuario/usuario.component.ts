import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from './usuario';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
  usuarios: IUsuario[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.getUsuarios();
  }

  deleteUsuario(id: string): void {
    const usuario = this.usuarios.find(x => x.ID_USUARIO === +id);

    if (confirm(`Borrar el usuario: ${usuario.USUARIO}?`)) {
      this._usuarioService.deleteUsuario(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getUsuarios();
    alert('Usuario eliminado');
  }

  getUsuarios() {
    this._usuarioService.getUsuarios()
      .subscribe(
        usuarios => this.usuarios = usuarios,
        error => this.errorMessage = <any>error
      );
  }
}
