import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../shared/router.animations';
import swal from 'sweetalert2'

import { HttpClient } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

@Component({
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  animations: [routerTransition()]
})
export class ReporteComponent implements OnInit {
    API:string            = 'http://localhost:3000/';
    export:any
    correcto:any
    fallido:any
    xls:any
    folio:any;
    selectedAll: any = true;
    // fecha: any
    region_ciclo_fecha : any
    success:number        = 0;
    expandSuccess:boolean = false;
    showBtnSend:boolean   = false;
    loading:boolean       = false;
    lineas:any            = [];
    countSelected:number   = 0;
    rowFolio:any = [];

    constructor( public router: Router, public http: HttpClient, ){
        this.folio = parseInt( localStorage.getItem("idFolio") );
        this.rowFolio = JSON.parse( localStorage.getItem("rowFolio") );
    }

    ngOnInit() {
        this.getLines();
    }

    expandPanel = ( panel ):void => {
        switch ( panel ) {
            case "success":
                this.expandSuccess  = true;
                break;
            case "error":
                this.expandSuccess  = false;
                break;
            default:
                this.expandSuccess  = false;
                break;
        }
    }

    getLines = ():void=>{
        this.http.post( this.API + 'api/cambioplan/getLines', { idFolio: parseInt( localStorage.getItem("idFolio") ) } )
            .subscribe(data => {
                this.lineas = data;
                console.log("nuevas lineas",this.lineas)
                this.lineas.data.forEach( function( item, key ){
                    item.CUOTA == null ? item['selected'] = false : item['selected'] = true;
                });
                this.checkSelected();
            });

    }

    selectAll = ():void => {
        if( this.selectedAll ){
            this.lineas.data.forEach( function( item, key ){
                item['selected'] = true;
            });
        }
        else{
            this.lineas.data.forEach( function( item, key ){
                item['selected'] = false;
            });
        }
        this.checkSelected();
    }

    checkIfAllSelected = ():void => {
        this.selectedAll = this.lineas.data.every(function(item:any) {
            return item.selected == true;
        })

        this.checkSelected();
    }


    checkSelected = ():void => {
        this.countSelected = 0;
        for ( var i = 0; i < this.lineas.data.length; i++ ){
            if( this.lineas.data[i].selected ){
                this.countSelected++;
            }
        }
    }

    aceptarFolio = ():void=>{
        swal({
            title: 'Autorización',
            text: '¿Estas seguro de aceptar el procesamiento de este Folio?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.http.post(this.API + 'api/autorizacion',{lineas:this.lineas,folio:this.folio})
                .subscribe(data=>{
                  localStorage.setItem("resultado", "1");
                    this.router.navigateByUrl('/autorizacion/resultado');
                })
            }
        })
    }

    rechazarFolio = ():void=>{
        swal({
            title: 'Autorización',
            text: '¿Estas seguro de rechazar el procesamiento de este Folio?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                localStorage.setItem("resultado", "0");
                this.router.navigateByUrl('/autorizacion/resultado');
            }
        })
    }

    exportarDatos = ():void=>{
        this.http.post( this.API + 'layout/export', { registros: this.lineas.data } )
            .subscribe(data => {
              this.xls = this.API + data +'.xlsx';
              window.open( this.xls );
            });
    }
}
