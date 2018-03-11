import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProcesoService } from '../../../services/proceso.service';
import { IProceso } from './proceso';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
  animations: [routerTransition()]
})
export class ProcesoComponent implements OnInit {
  procesos: IProceso[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _procesoService: ProcesoService, private router: Router) { }

  ngOnInit() {
    this.getProcesos();
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

  deleteProceso(id: string): void {
    const PROCESO = this.procesos.find(x => x.ID_PROCESO === +id);

    if (confirm(`Borrar el PROCESO: ${PROCESO.PROCESO}?`)) {
      this._procesoService.deleteProceso(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getProcesos();
    alert('PROCESO eliminado');
  }

  getProcesos() {
    this._procesoService.getProcesos()
      .subscribe(
        procesos => this.procesos = procesos,
        error => this.errorMessage = <any>error
      );
  }
}
