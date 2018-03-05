import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../shared/router.animations';

import {lineas} from '../dommy/lineas'

@Component({
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
  animations: [routerTransition()]
})
export class ResultadoComponent implements OnInit {
    correcto:any
    fallido:any
    expandError:boolean   = false;
    expandSuccess:boolean = false;
    folio:any 

    constructor() { }

    ngOnInit() {
        this.folio = JSON.parse( localStorage.getItem('folio') );
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
