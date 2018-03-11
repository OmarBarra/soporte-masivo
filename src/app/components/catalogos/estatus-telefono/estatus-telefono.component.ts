import { Component, OnInit } from '@angular/core';
import { IEstatusTelefono } from './estatus-telefono';
import { Router } from '@angular/router';

import { EstatusTelefonoService } from '../../../services/estatus-telefono.service';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './estatus-telefono.component.html',
  styleUrls: ['./estatus-telefono.component.scss'],
  animations: [routerTransition()]
})
export class EstatusTelefonoComponent implements OnInit {
  estatusTelefono: IEstatusTelefono[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _estatusTelefonoService: EstatusTelefonoService, private router: Router) { }

  ngOnInit() {
    this.getEstatusTelefonos();
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

  deleteEstatusTelefono(id: string): void {
    const ESTATUS_TELEFONO: IEstatusTelefono = this.estatusTelefono.find(x => x.ID_ESTATUS_TELEFONO === +id);

    if (confirm(`Borrar el ESTATUS_TELEFONO: ${ESTATUS_TELEFONO.ESTATUS}?`)) {
      this._estatusTelefonoService.deleteEstatusTelefono(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getEstatusTelefonos();
    alert('ESTATUS_TELEFONO eliminado');
  }

  getEstatusTelefonos() {
    this._estatusTelefonoService.getEstatusTelefonos()
      .subscribe(
        estatusTelefono => this.estatusTelefono = estatusTelefono,
        error => this.errorMessage = <any>error
      );
  }
}
