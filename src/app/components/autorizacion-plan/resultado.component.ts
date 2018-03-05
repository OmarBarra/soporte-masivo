import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../shared/router.animations';

import {lineas} from '../dommy/lineas'

@Component({
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
  animations: [routerTransition()]
})
export class ResultadoComponentAutoriza implements OnInit {
    correcto:any
    fallido:any
    expandError:boolean   = false;
    expandSuccess:boolean = false;
    folio:any;
    tipo:number           = 0;


    constructor() { }

    ngOnInit() {
        this.folio = parseInt( localStorage.getItem('idFolio') );
        this.tipo =  parseInt( localStorage.getItem('resultado') );
    }

    // getData(){
    // }

    expandPanel = ( panel ):void => {
        console.log( panel );
        switch ( panel ) {
            case "success":
                console.log(1);
                this.expandSuccess  = true;
                this.expandError    = false;
                break;
            case "error":
                console.log(2);
                this.expandSuccess  = false;
                this.expandError    = true;
                break;            
            default:
                console.log(3);
                this.expandError    = false;
                this.expandSuccess  = false;
                break;
        }
    }
}
