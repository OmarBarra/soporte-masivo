import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  templateUrl: './baja-plan.component.html',
  styleUrls: ['./baja-plan.component.scss'],
  animations: [routerTransition()]
})
export class BajaPlanComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
