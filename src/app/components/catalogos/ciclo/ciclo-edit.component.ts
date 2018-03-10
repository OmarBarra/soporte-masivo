import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { routerTransition } from '../../shared/router.animations';
import { ICiclo } from './ciclo';
import { CicloService } from '../../../services/ciclo.service';

@Component({
  templateUrl: './ciclo-edit.component.html',
  styleUrls: ['./ciclo-edit.component.scss'],
  animations: [routerTransition()]
})
export class CicloEditComponent implements OnInit {

  pageTitle = 'Ciclo Edit';
  errorMessage: string;
  cicloForm: FormGroup;

  ciclo: ICiclo[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private _cicloService: CicloService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.cicloForm = this.fb.group({
      CICLO: ['', Validators.required],
      DESCRIPCION: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the ciclo Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getCiclo(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      cicloName: {
        required: 'Ciclo name is required.',
        minlength: 'Ciclo name must be at least three characters.',
        maxlength: 'Ciclo name cannot exceed 50 characters.'
      },
      cicloCode: {
        required: 'Ciclo code is required.'
      },
      starRating: {
        range: 'Rate the ciclo between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getCiclo(id) {
    this._cicloService.getCiclo(id)
      .subscribe(
        ciclo => this.onCicloRetrieved(ciclo[0]),
        error => this.errorMessage = <any>error
      );
  }

  onCicloRetrieved(ciclo: ICiclo): void {
    if (this.cicloForm) {
      this.cicloForm.reset();
    }
    this.ciclo[0] = ciclo;

    if (this.ciclo[0].ID_CICLO === 0) {
      this.pageTitle = 'Agregar Ciclo';
    } else {
      this.pageTitle = `Editar Ciclo: ${this.ciclo[0].DESCRIPCION}`;
    }

    // Update the data on the form
    this.cicloForm.patchValue({
      CICLO: this.ciclo[0].CICLO,
      DESCRIPCION: this.ciclo[0].DESCRIPCION,
      ACTIVO: this.ciclo[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.cicloForm.dirty && this.cicloForm.valid) {
      // Copy the form values over the ciclo object values
      const p = Object.assign({}, this.ciclo[0], this.cicloForm.value);

      this._cicloService.updateCiclo(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.cicloForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.cicloForm.reset();
    this.router.navigate(['/ciclo']);
  }
}
