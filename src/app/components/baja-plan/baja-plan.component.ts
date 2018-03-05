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
    templateUrl: './baja-plan.component.html',
    styleUrls: ['./baja-plan.component.scss'],
    animations: [routerTransition()]
})

export class BajaPlanComponent implements OnInit {
    @ViewChild('myInput')
    myInputVariable: any;

    API:string            = 'http://localhost:3000/';
    loading:boolean       = false;

    frmBajaPlan: FormGroup;
    region     = new FormControl("", Validators.required);
    lblRegion  = new FormControl("", Validators.required);
    ciclo      = new FormControl("", Validators.required);
    fileInput  = new FormControl("");
    idUsuario  = new FormControl("", Validators.required);

    layout:number         = 0;
    arrayRegion: any      = [];
    arrayCilco: any       = [];
    file:any              = [];

    constructor( public router: Router,
                 public http: HttpClient,
                 public fb: FormBuilder) {

        this.frmBajaPlan = fb.group({
            "idUsuario":  this.idUsuario,
            "region":     this.region,
            "lblRegion":  this.lblRegion,
            "ciclo":      this.ciclo,
            "fileInput": this.fileInput
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
        let inRegion = this.frmBajaPlan.get('region').value;
        let inCiclo  = this.frmBajaPlan.get('ciclo').value;
        if( inRegion == '' || inRegion === null || inRegion === undefined ){
            swal("Baja de plan","Debe proporcionar la Región para esta operación.","warning");
        }
        else if( inCiclo == 0 || inCiclo == '' || inCiclo === null || inCiclo === undefined ){
            swal("Baja de plan","Debe proporcionar el Ciclo para esta operación.","warning");
        }
        else if( this.layout == 0 ){
            swal("Baja de plan","El archivo no ha sido cargado.","warning");
        }
        else{
            this.loading = true;
            this.frmBajaPlan.controls['idUsuario'].setValue(1);
            this.frmBajaPlan.controls['ciclo'].setValue( inCiclo);
            this.frmBajaPlan.controls['region'].setValue( inRegion);
            // console.log(this.frmBajaPlan.value)
            this.http.post( this.API + 'api/bajaplan/verifica', this.frmBajaPlan.value )
            .subscribe(data => {
                let region_ciclo = {ciclo : inCiclo, region : inRegion};
                localStorage.setItem('rowsBajaPlan', JSON.stringify( data ) );
                localStorage.setItem('validData',JSON.stringify( region_ciclo ));
                this.router.navigateByUrl('/baja-plan/valida-archivo');
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
                this.frmBajaPlan.controls['fileInput'].setValue( {
                    filename: input.name,
                    filetype: input.type,
                    value: reader.result.split(',')[1]
                });
            };
        }
        else{
            this.myInputVariable.nativeElement.value = "";
            swal("Baja de plan","El archivo que ha seleccionado no es un archivo válido.","warning");
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
