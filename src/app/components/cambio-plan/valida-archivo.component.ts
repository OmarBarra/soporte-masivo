import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../shared/router.animations';

import { HttpClient } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

@Component({
  templateUrl: './valida-archivo.component.html',
  styleUrls: ['./valida-archivo.component.scss'],
  animations: [routerTransition()]
})
export class ValidaArchivoComponentCambio implements OnInit {
    API:string            = 'http://localhost:3000/';
    export:any
    correcto:any
    fallido:any
    xls:any
    // fecha: any
    region_ciclo_fecha : any
    success:number        = 0;
    expandError:boolean   = false;
    expandSuccess:boolean = false;
    showBtnSend:boolean   = false;
    loading:boolean       = false;
    totalRespuestas:any   = { fallido: 0, correcto: 0 }


    constructor( public router: Router, public http: HttpClient, ){ }

    ngOnInit() {
        let data = JSON.parse( localStorage.getItem('rowsCambioPlan') );
        this.region_ciclo_fecha = JSON.parse( localStorage.getItem('regionCicloFecha'));
        // console.log("front localstorage",this.region_ciclo_fecha )
        if( data.success == 1 ){
            data.correcto.forEach((item,key)=>{
              item.detalle == undefined || item.detalle == '' ? item.detalle = 'Formato Correcto' : false;
            })
            let arreglo  = []
            this.correcto = data.correcto;
            this.fallido = data.fallido;
            data.correcto.forEach((item)=>{
              arreglo.push(item)
            })
            data.fallido.forEach((item)=>{
              arreglo.push(item)
            })
            this.export=arreglo
            this.success = parseInt(data.success);
            this.showBtnSend = this.correcto.length == 0 ? false : true;
            this.totalRespuestas= { fallido: this.fallido.length, correcto: this.correcto.length }
        }
    }

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

    enviarDatos = ():void=>{
        this.loading = true;
        this.http.post( this.API + 'api/cambioplan/insertRowSuccess', { registrosOk: this.correcto , registrosNot: this.fallido ,regionCicloFecha:this.region_ciclo_fecha} )
            .subscribe(data => {
              console.log(data)
                localStorage.setItem('folio', JSON.stringify( data ) );
                this.router.navigateByUrl('/cambio-plan/resultado');
            });
    }

    exportarDatos = ():void=>{
        this.http.post( this.API + 'layout/export', { registros: this.export } )
            .subscribe(data => {
              this.xls = this.API + data +'.xlsx';
              window.open( this.xls );
            });
    }
}
