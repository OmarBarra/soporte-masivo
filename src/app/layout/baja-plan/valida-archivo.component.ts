import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  templateUrl: './valida-archivo.component.html',
  styleUrls: ['./valida-archivo.component.scss'],
  animations: [routerTransition()]
})
export class ValidaArchivoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.fixedHeader('idTablaInvalid');
    this.fixedHeader('idTablaValid');
  }

  // Usa CSS transforms para dejar los titulos fijos en la tabla
  fixedHeader(idTabla): void {
    // Esperar a que se construya la tabla, delay de 1 segundo
    setTimeout(function () {
      document.getElementById(idTabla).addEventListener('scroll', function(){
        const translate = 'translate(0,' + this.scrollTop + 'px)';
        this.querySelector('thead').style.transform = translate;
    });
   }, 1000);
  }

}
