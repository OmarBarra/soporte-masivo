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
  }

}
