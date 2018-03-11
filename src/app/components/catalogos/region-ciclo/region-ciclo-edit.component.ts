import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RegionCicloService } from '../../../services/region-ciclo.service';
import { IRegionCiclo } from './region-ciclo';
import { routerTransition } from '../../shared/router.animations';
import { RegionService } from '../../../services/region.service';
import { IRegion } from '../region/region';
import { ICiclo } from '../ciclo/ciclo';
import { CicloService } from '../../../services/ciclo.service';

@Component({
  templateUrl: './region-ciclo-edit.component.html',
  styleUrls: ['./region-ciclo-edit.component.scss'],
  animations: [routerTransition()]
})
export class RegionCicloEditComponent implements OnInit {
  pageTitle = 'RegionCiclo Edit';
  errorMessage: string;
  regionCicloForm: FormGroup;

  regionCiclo: IRegionCiclo[] = [];
  regiones: IRegion[];
  selectedRegion: number;
  ciclos: ICiclo[];
  selectedCiclo: number;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private _regionCicloService: RegionCicloService,
    private _regionService: RegionService,
    private _cicloService: CicloService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.regionCicloForm = this.fb.group({
      ID_REGION: [this.selectedRegion],
      ID_CICLO: [this.selectedCiclo]
    });

    // Read regiones into dropdown
    this._regionService.getRegiones().subscribe(
      regiones => {
        this.regiones = regiones;
        this.selectedRegion = this.regiones[0].ID_REGION || 0;
       }
    );

    // Read Ciclos into dropdown
    this._cicloService.getCiclos().subscribe(
      ciclos => {
        this.ciclos = ciclos;
        this.selectedCiclo = this.ciclos[0].ID_CICLO || 0;
      }
    );

    // Read the regionCiclo Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getRegionCiclo(id);
      }
    );

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      regionCicloName: {
        required: 'RegionCiclo name is required.',
        minlength: 'RegionCiclo name must be at least three characters.',
        maxlength: 'RegionCiclo name cannot exceed 50 characters.'
      },
      regionCicloCode: {
        required: 'RegionCiclo code is required.'
      },
      starRating: {
        range: 'Rate the regionCiclo between 1 (lowest) and 5 (highest).'
      }
    };
  }

  getRegionCiclo(id) {
    this._regionCicloService.getRegionCiclo(id)
      .subscribe(
        regionCiclo => this.onRegionCicloRetrieved(regionCiclo[0]),
        error => this.errorMessage = <any>error,
        () => {
          if (this.regionCiclo[0].ID_REGION_CICLO !== 0) {
            // Update the data on the form
            this.regionCicloForm.patchValue({
              ID_REGION: this.regionCiclo[0].ID_REGION,
              ID_CICLO: this.regionCiclo[0].ID_CICLO
            });
          }
        }
      );
  }

  onRegionCicloRetrieved(regionCiclo: IRegionCiclo): void {
    if (this.regionCicloForm) {
      this.regionCicloForm.reset();
    }
    this.regionCiclo[0] = regionCiclo;

    if (this.regionCiclo[0].ID_REGION_CICLO === 0) {
      this.pageTitle = 'Agregar Región - Ciclo';
    } else {
      this.pageTitle = `Editar Región - Ciclo: ${this.regionCiclo[0].ID_REGION_CICLO}`;
    }
  }

  onSubmit(): void {
    if (this.regionCicloForm.valid) {
      // Update the data on the form
      this.regionCicloForm.patchValue({
        ID_REGION: this.selectedRegion,
        ID_CICLO: this.selectedCiclo
      });

      // Copy the form values over the regionCiclo object values
      const p = Object.assign({}, this.regionCiclo[0], this.regionCicloForm.value);

      this._regionCicloService.updateRegionCiclo(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.regionCicloForm.reset();
    this.router.navigate(['/region-ciclo']);
  }
}
