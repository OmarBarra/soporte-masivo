import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IProceso } from './proceso';
import { ProcesoService } from '../../../services/proceso.service';
import { Subscription } from 'rxjs/Subscription';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './proceso-edit.component.html',
  styleUrls: ['./proceso-edit.component.scss'],
  animations: [routerTransition()]
})
export class ProcesoEditComponent implements OnInit {
  pageTitle = 'Proceso Edit';
  errorMessage: string;
  procesoForm: FormGroup;

  proceso: IProceso[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private _procesoService: ProcesoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.procesoForm = this.fb.group({
      PROCESO: ['', Validators.required],
      CODE: ['', Validators.required],
      COMENTARIO: ['', Validators.required],
    });

    // Read the proceso Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProceso(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      procesoName: {
        required: 'Proceso name is required.',
        minlength: 'Proceso name must be at least three characters.',
        maxlength: 'Proceso name cannot exceed 50 characters.'
      },
      procesoCode: {
        required: 'Proceso code is required.'
      },
      starRating: {
        range: 'Rate the proceso between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getProceso(id) {
    this._procesoService.getProceso(id)
      .subscribe(
        proceso => this.onProcesoRetrieved(proceso[0]),
        error => this.errorMessage = <any>error
      );
  }

  onProcesoRetrieved(proceso: IProceso): void {
    if (this.procesoForm) {
      this.procesoForm.reset();
    }
    this.proceso[0] = proceso;

    if (this.proceso[0].ID_PROCESO === 0) {
      this.pageTitle = 'Agregar Proceso';
    } else {
      this.pageTitle = `Editar Proceso: ${this.proceso[0].CODE}`;
    }

    // Update the data on the form
    this.procesoForm.patchValue({
      PROCESO: this.proceso[0].PROCESO,
      CODE: this.proceso[0].CODE,
      COMENTARIO: this.proceso[0].COMENTARIO
    });
  }

  onSubmit(): void {
    if (this.procesoForm.dirty && this.procesoForm.valid) {
      // Copy the form values over the proceso object values
      const p = Object.assign({}, this.proceso[0], this.procesoForm.value);

      this._procesoService.updateProceso(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.procesoForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.procesoForm.reset();
    this.router.navigate(['/proceso']);
  }
}
