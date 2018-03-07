import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegionService } from '../../../services/region.service';
import { IRegion } from './region';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  animations: [routerTransition()]
})
export class RegionComponent implements OnInit {
  regiones: IRegion[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _regionService: RegionService, private router: Router) { }

  ngOnInit() {
    this.getRegiones();
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

  deleteRegion(id: string): void {
    const region = this.regiones.find(x => x.ID_REGION === +id);

    if (confirm(`Borrar la región: ${region.REGION}?`)) {
      this._regionService.deleteRegiones(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getRegiones();
    alert('Región eliminada');
  }

  getRegiones() {
    this._regionService.getRegiones()
      .subscribe(
        regiones => this.regiones = regiones,
        error => this.errorMessage = <any>error
      );
  }

}
