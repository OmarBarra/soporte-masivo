import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { routerTransition } from '../../shared/router.animations';
import { ITipoGrupo } from './tipo-grupo';
import { TipoGrupoService } from '../../../services/tipo-grupo.service';

@Component({
  templateUrl: './tipo-grupo-edit.component.html',
  styleUrls: ['./tipo-grupo-edit.component.scss'],
  animations: [routerTransition()]
})
export class TipoGrupoEditComponent implements OnInit {
  pageTitle = 'TipoGrupo Edit';
  errorMessage: string;
  tipoGrupoForm: FormGroup;

  tipoGrupo: ITipoGrupo[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private _tipoGrupoService: TipoGrupoService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.tipoGrupoForm = this.fb.group({
      GRUPO: ['', Validators.required],
      DESCRIPCION: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the tipoGrupo Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getTipoGrupo(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      tipoGrupoName: {
        required: 'TipoGrupo name is required.',
        minlength: 'TipoGrupo name must be at least three characters.',
        maxlength: 'TipoGrupo name cannot exceed 50 characters.'
      },
      tipoGrupoCode: {
        required: 'TipoGrupo code is required.'
      },
      starRating: {
        range: 'Rate the tipoGrupo between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getTipoGrupo(id) {
    this._tipoGrupoService.getTipoGrupo(id)
      .subscribe(
        tipoGrupo => this.onTipoGrupoRetrieved(tipoGrupo[0]),
        error => this.errorMessage = <any>error
      );
  }

  onTipoGrupoRetrieved(tipoGrupo: ITipoGrupo): void {
    if (this.tipoGrupoForm) {
      this.tipoGrupoForm.reset();
    }
    this.tipoGrupo[0] = tipoGrupo;

    if (this.tipoGrupo[0].ID_TIPO_GRUPO === 0) {
      this.pageTitle = 'Agregar Tipo Grupo';
    } else {
      this.pageTitle = `Editar Tipo Grupo: ${this.tipoGrupo[0].DESCRIPCION}`;
    }

    // Update the data on the form
    this.tipoGrupoForm.patchValue({
      GRUPO: this.tipoGrupo[0].GRUPO,
      DESCRIPCION: this.tipoGrupo[0].DESCRIPCION,
      ACTIVO: this.tipoGrupo[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.tipoGrupoForm.dirty && this.tipoGrupoForm.valid) {
      // Copy the form values over the tipoGrupo object values
      const p = Object.assign({}, this.tipoGrupo[0], this.tipoGrupoForm.value);

      this._tipoGrupoService.updateTipoGrupo(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.tipoGrupoForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.tipoGrupoForm.reset();
    this.router.navigate(['/tipoGrupo']);
  }
}
