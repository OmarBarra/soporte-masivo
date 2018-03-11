import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { routerTransition } from '../../shared/router.animations';
import { EstatusTelefonoService } from '../../../services/estatus-telefono.service';
import { IEstatusTelefono } from './estatus-telefono';

@Component({
  templateUrl: './estatus-telefono-edit.component.html',
  styleUrls: ['./estatus-telefono-edit.component.scss'],
  animations: [routerTransition()]
})
export class EstatusTelefonoEditComponent implements OnInit {
  pageTitle = 'EstatusTelefono Edit';
  errorMessage: string;
  estatusTelefonoForm: FormGroup;

  estatusTelefono: IEstatusTelefono[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private _estatusTelefonoService: EstatusTelefonoService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.estatusTelefonoForm = this.fb.group({
      ESTATUS: ['', Validators.required],
      DESCRIPCION: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the estatusTelefono Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getEstatusTelefono(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      estatusTelefonoName: {
        required: 'EstatusTelefono name is required.',
        minlength: 'EstatusTelefono name must be at least three characters.',
        maxlength: 'EstatusTelefono name cannot exceed 50 characters.'
      },
      estatusTelefonoCode: {
        required: 'EstatusTelefono code is required.'
      },
      starRating: {
        range: 'Rate the estatusTelefono between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getEstatusTelefono(id) {
    this._estatusTelefonoService.getEstatusTelefono(id)
      .subscribe(
        estatusTelefono => this.onEstatusTelefonoRetrieved(estatusTelefono[0]),
        error => this.errorMessage = <any>error
      );
  }

  onEstatusTelefonoRetrieved(estatusTelefono: IEstatusTelefono): void {
    if (this.estatusTelefonoForm) {
      this.estatusTelefonoForm.reset();
    }
    this.estatusTelefono[0] = estatusTelefono;

    if (this.estatusTelefono[0].ID_ESTATUS_TELEFONO === 0) {
      this.pageTitle = 'Agregar EstatusTelefono';
    } else {
      this.pageTitle = `Editar EstatusTelefono: ${this.estatusTelefono[0].DESCRIPCION}`;
    }

    // Update the data on the form
    this.estatusTelefonoForm.patchValue({
      ESTATUS: this.estatusTelefono[0].ESTATUS,
      DESCRIPCION: this.estatusTelefono[0].DESCRIPCION,
      ACTIVO: this.estatusTelefono[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.estatusTelefonoForm.dirty && this.estatusTelefonoForm.valid) {
      // Copy the form values over the estatusTelefono object values
      const p = Object.assign({}, this.estatusTelefono[0], this.estatusTelefonoForm.value);

      this._estatusTelefonoService.updateEstatusTelefono(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.estatusTelefonoForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.estatusTelefonoForm.reset();
    this.router.navigate(['/estatusTelefono']);
  }
}
