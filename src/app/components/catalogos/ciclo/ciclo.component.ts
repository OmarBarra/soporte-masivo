import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../../shared/router.animations';
import { ICiclo } from './ciclo';
import { CicloService } from '../../../services/ciclo.service';


@Component({
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.scss'],
  animations: [routerTransition()]
})
export class CicloComponent implements OnInit {
  ciclos: ICiclo[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _cicloService: CicloService, private router: Router) { }

  ngOnInit() {
    this.getCiclos();
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

  deleteCiclo(id: string): void {
    const CICLO = this.ciclos.find(x => x.ID_CICLO === +id);

    if (confirm(`Borrar el CICLO: ${CICLO.CICLO}?`)) {
      this._cicloService.deleteCiclo(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getCiclos();
    alert('CICLO eliminado');
  }

  getCiclos() {
    this._cicloService.getCiclos()
      .subscribe(
        ciclos => this.ciclos = ciclos,
        error => this.errorMessage = <any>error
      );
  }
}
