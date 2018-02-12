import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './baja-plan.component.html',
  styleUrls: ['./baja-plan.component.scss'],
  animations: [routerTransition()]
})
export class BajaPlanComponent implements OnInit {

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(): void {
    // this._router.navigate(['/baja-plan', 'valida-archivo'], { relativeTo: this._route });
    alert('asas');
    console.log('asas');
    this._router.navigate(['/baja-plan', 'valida-archivo']);
  }

}
