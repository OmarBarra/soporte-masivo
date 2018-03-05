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
    templateUrl: './cambio-plan.component.html',
    styleUrls: ['./cambio-plan.component.scss'],
    animations: [routerTransition()]
})

export class CambioPlanComponent implements OnInit {
    @ViewChild('myInput')
    myInputVariable: any;

    API:string            = 'http://localhost:3000/';
    loading:boolean       = false;

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

    ngOnInit() {
        this.getRegion();
        // this.getCiclo();
    }

    onSubmit=():void =>{
        alert("Enviando formulario");
    }

    validaArchivo(){
        let inRegion     = this.frmCambioPlan.get('region').value;
        let inCiclo      = this.frmCambioPlan.get('ciclo').value;
        let fEjecucion   = this.frmCambioPlan.get('fechaEjecucion').value;
        var date = new Date(fEjecucion);

        var year      = date.getFullYear();
        var month     = date.getMonth() + 1; //getMonth is zero based;
            // month     = month < 10 ? "0" + month : month;
        var day       = date.getDate();
            // day       = day < 10 ? "0" + day : day;
        var formatted = year.toString().replace("20","")+"-"+month+"-"+day;

        // console.log( "Formater", formatted );
        this.frmCambioPlan.controls['fechaEjecucion'].setValue(formatted);

        if( inRegion == '' || inRegion === null || inRegion === undefined ){
            swal("Cambiio de plan","Debe proporcionar la Región para esta operación.","warning");
        }
        else if( inCiclo == 0 || inCiclo == '' || inCiclo === null || inCiclo === undefined ){
            swal("Cambio de plan","Debe proporcionar el Ciclo para esta operación.","warning");
        }
        else if( this.layout == 0 ){
            swal("Cambio de plan","El archivo no ha sido cargado.","warning");
        }
        else if( fEjecucion == '' ){
            swal("Cambio de plan","Debes proporcionar la fecha de ejecución.","warning");
        }
        else{
            this.loading = true;
            this.frmCambioPlan.controls['idUsuario'].setValue(1);
            this.frmCambioPlan.controls['ciclo'].setValue( inCiclo);
            this.frmCambioPlan.controls['region'].setValue( inRegion);
            let fecha = this.frmCambioPlan.value.fechaEjecucion
            this.http.post( this.API + 'api/cambioplan/verifica', this.frmCambioPlan.value )
            .subscribe(data => {
                let region_ciclo_fecha = {ciclo : inCiclo, region : inRegion, fecha:fEjecucion};
                localStorage.setItem('rowsCambioPlan', JSON.stringify( data ) );
                localStorage.setItem('regionCicloFecha',JSON.stringify( region_ciclo_fecha ));
                this.router.navigateByUrl('/cambio-plan/valida-archivo');
            });
        }
    }

    onFileChange( $event ){
        let reader = new FileReader();
        let input = $event.target.files[0];

        let type = input.name.split('.').pop();
        if( type == "xlsx" || type == "xls" || type == "XLSC" || type == "XSL" ){
            this.layout = 1;
            this.file = input;

            var str = input.name;
            var ext = '.' + str.split('.').pop();

            reader.readAsDataURL(input);
            reader.onload = () => {
                this.frmCambioPlan.controls['fileInput'].setValue( {
                    filename: input.name,
                    filetype: input.type,
                    value: reader.result.split(',')[1]
                });
            };
        }
        else{
            this.myInputVariable.nativeElement.value = "";
            swal("Cambio de plan","El archivo que ha seleccionado no es un archivo válido.","warning");
        }
    }

    onRegionChange($event){
      let id_region = $event.target.value;
      this.arrayCilco = []
      this.getCiclo(id_region)

    }

    getRegion = ():void => {
        this.http.get( this.API + 'api/catalogo/region')
        .subscribe(data => {
            this.arrayRegion = data;
        });
    }

    getCiclo = (d):void => {
        this.http.post( this.API + 'api/catalogo/ciclo',{id_region:d})
        .subscribe(data => {
            this.arrayCilco = data;
        });
    }
}
