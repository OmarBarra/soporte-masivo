import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IUsuario } from './usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { routerTransition } from '../../shared/router.animations';
import { IPerfil, PerfilService } from '../../../services/perfil.service';

@Component({
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
  animations: [routerTransition()]
})
export class UsuarioEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;
  productForm: FormGroup;

  usuario: IUsuario[] = [];
  perfiles: IPerfil[] = [];
  selectedPerfil: number;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private _perfilService: PerfilService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      ID_PERFIL: [''],
      USUARIO: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getUsuario(id);
      }
    );

    // Read Perfiles into the dropdown
    this._perfilService.getPerfiles().subscribe(
      perfiles => {
        this.perfiles = perfiles;
        this.selectedPerfil = perfiles[0].ID_PERFIL || null;
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getUsuario(id) {
    this._usuarioService.getUsuario(id)
      .subscribe(
        usuario => this.onProductRetrieved(usuario[0]),
        error => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(usuario: IUsuario): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.usuario[0] = usuario;

    if (this.usuario[0].ID_USUARIO === 0) {
      this.pageTitle = 'Agregar Usuario';
    } else {
      this.pageTitle = `Editar Usuario: ${this.usuario[0].USUARIO}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      ID_PERFIL: this.usuario[0].ID_PERFIL,
      USUARIO: this.usuario[0].USUARIO,
      ACTIVO: this.usuario[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      // Update the data on the form
      this.productForm.patchValue({
        ID_PERFIL: this.selectedPerfil,
      });

      // Copy the form values over the product object values
      const p = Object.assign({}, this.usuario[0], this.productForm.value);

      this._usuarioService.updateUsuario(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/usuario']);
  }
}
