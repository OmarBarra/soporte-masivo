import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../shared/router.animations';
import swal from 'sweetalert2'

import { HttpClient } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgForm,
  } from '@angular/forms';

@Component({
    templateUrl: './autorizacion-plan.component.html',
    styleUrls: ['./autorizacion-plan.component.scss'],
    animations: [routerTransition()]
})

export class AutorizacionPlanComponent implements OnInit {
    @ViewChild('myInput')
    myInputVariable: any;

    API:string            = 'http://localhost:3000/';
    loading:boolean       = false;
    expandSuccess:boolean = false;

    frmCambioPlan: FormGroup;
    region          = new FormControl("", Validators.required);
    lblRegion       = new FormControl("", Validators.required);
    ciclo           = new FormControl("", Validators.required);
    fileInput       = new FormControl("");
    fechaEjecucion  = new FormControl("");
    idUsuario       = new FormControl("", Validators.required);

    layout:number         = 0;
    arrayRegion: any      = [];
    arrayCilco: any       = [];
    file:any              = [];
    folios:any            = [];

    constructor( public router: Router,
                 public http: HttpClient,
                 public fb: FormBuilder) {

        this.frmCambioPlan = fb.group({
            "idUsuario":      this.idUsuario,
            "region":         this.region,
            "lblRegion":      this.lblRegion,
            "ciclo":          this.ciclo,
            "fileInput":      this.fileInput,
            "fechaEjecucion": this.fechaEjecucion
        });
    }

    ngOnInit(){
        this.loadFolios();
    }

    onSubmit = ():void =>{
        alert("Enviando formulario");
    }

    loadFolios = ():void =>{
        this.http.post( this.API + 'api/cambioplan/getFolio',{} )
        .subscribe(data => {
            this.folios = data;
          });
    }

    expandPanel = ( panel ):void => {
        console.log( panel );
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

    verMas = ( index ):void => {
        this.router.navigateByUrl('/autorizacion/reporte');
        localStorage.setItem("idFolio", this.folios.data[index].ID_FOLIO);
        localStorage.setItem("rowFolio", JSON.stringify(this.folios.data[index]));
    }
}
