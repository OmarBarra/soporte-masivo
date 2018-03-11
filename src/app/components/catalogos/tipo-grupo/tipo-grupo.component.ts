import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITipoGrupo } from './tipo-grupo';
import { TipoGrupoService } from '../../../services/tipo-grupo.service';
import { routerTransition } from '../../shared/router.animations';

@Component({
  templateUrl: './tipo-grupo.component.html',
  styleUrls: ['./tipo-grupo.component.scss'],
  animations: [routerTransition()]
})
export class TipoGrupoComponent implements OnInit {
  tipoGrupo: ITipoGrupo[];
  errorMessage: string;
  expandError = false;
  expandSuccess = false;

  constructor(private _tipoGrupoService: TipoGrupoService, private router: Router) { }

  ngOnInit() {
    this.getTipoGrupos();
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

  deleteTipoGrupo(id: string): void {
    const TIPO_GRUPO: ITipoGrupo = this.tipoGrupo.find(x => x.ID_TIPO_GRUPO === +id);

    if (confirm(`Borrar el TIPO_GRUPO: ${TIPO_GRUPO.GRUPO}?`)) {
      this._tipoGrupoService.deleteTipoGrupo(id)
        .subscribe(
          () => this.onDeleteComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onDeleteComplete() {
    this.getTipoGrupos();
    alert('TIPO_GRUPO eliminado');
  }

  getTipoGrupos() {
    this._tipoGrupoService.getTipoGrupos()
      .subscribe(
        tipoGrupo => this.tipoGrupo = tipoGrupo,
        error => this.errorMessage = <any>error
      );
  }
}
