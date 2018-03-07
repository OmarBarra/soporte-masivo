import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../shared/router.animations';
import { IRegion } from './region';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../../services/region.service';

@Component({
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.scss'],
  animations: [routerTransition()]
})
export class RegionEditComponent implements OnInit {
  pageTitle = 'Region Edit';
  errorMessage: string;
  regionForm: FormGroup;

  region: IRegion[] = [];
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private _regionService: RegionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.regionForm = this.fb.group({
      REGION: ['', Validators.required],
      ACTIVO: ['', Validators.required],
    });

    // Read the region Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getRegion(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      regionName: {
        required: 'region name is required.',
        minlength: 'region name must be at least three characters.',
        maxlength: 'region name cannot exceed 50 characters.'
      },
      regionCode: {
        required: 'region code is required.'
      },
      starRating: {
        range: 'Rate the region between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getRegion(id) {
    this._regionService.getRegion(id)
      .subscribe(
        region => this.onRegionRetrieved(region[0]),
        error => this.errorMessage = <any>error
      );
  }

  onRegionRetrieved(region: IRegion): void {
    if (this.regionForm) {
      this.regionForm.reset();
    }
    this.region[0] = region;

    if (this.region[0].ID_REGION === 0) {
      this.pageTitle = 'Agregar Region';
    } else {
      this.pageTitle = `Editar Region: ${this.region[0].REGION}`;
    }

    // Update the data on the form
    this.regionForm.patchValue({
      REGION: this.region[0].REGION,
      ACTIVO: this.region[0].ACTIVO
    });
  }

  onSubmit(): void {
    if (this.regionForm.dirty && this.regionForm.valid) {
      // Copy the form values over the region object values
      const p = Object.assign({}, this.region[0], this.regionForm.value);

      this._regionService.updateRegion(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.regionForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.regionForm.reset();
    this.router.navigate(['/region']);
  }

}
