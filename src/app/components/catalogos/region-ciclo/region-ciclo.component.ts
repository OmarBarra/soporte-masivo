import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IRegionCiclo } from './region-ciclo';
import { RegionCicloService } from '../../../services/region-ciclo.service';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './region-ciclo.component.html',
  styleUrls: ['./region-ciclo.component.scss'],
  animations: [routerTransition()]
})
export class RegionCicloComponent implements OnInit {
  regionCiclo: IRegionCiclo[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _regionCicloService: RegionCicloService, private router: Router) { }

  ngOnInit() {
    this.getRegionCiclos();
  }

  expandPanel = (panel): void => {
    console.log(panel);
    switch (panel) {
      case 'success':
        console.log(1);
        this.expandSuccess = true;
        this.expandError = false;
        break;
      case 'error':
        console.log(2);
        this.expandSuccess = false;
        this.expandError = true;
        break;
      default:
        console.log(3);
        this.expandError = false;
        this.expandSuccess = false;
        break;
    }
  }

  deleteRegionCiclo(id: string): void {
    const REGION_CICLO: IRegionCiclo = this.regionCiclo.find(x => x.ID_REGION_CICLO === +id);

    if (confirm(`Borrar la relación región - ciclo: Región: ${REGION_CICLO.ID_REGION} - Ciclo: ${REGION_CICLO.ID_CICLO}?`)) {
      this._regionCicloService.deleteRegionCiclo(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getRegionCiclos();
    alert('REGION_CICLO eliminado');
  }

  getRegionCiclos() {
    this._regionCicloService.getRegionCiclos()
      .subscribe(
        regionCiclo => this.regionCiclo = regionCiclo,
        error => this.errorMessage = <any>error
      );
  }
}
