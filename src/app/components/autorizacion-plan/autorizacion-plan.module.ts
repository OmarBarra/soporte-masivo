import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { AutorizacionPlanComponent } 		from './autorizacion-plan.component';
import { ReporteComponent } 	from './reporte.component';
import { ResultadoComponentAutoriza } 		from './resultado.component';
import { AutorizacionPlanRoutingModule } 	from './autorizacion-plan-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule } 		from "@angular/forms";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    AutorizacionPlanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
        backdropBackgroundColour: 'rgba(255,255,255,0.4)', 
        backdropBorderRadius: '1px',
        primaryColour: '#00458a', 
        secondaryColour: '#00458a', 
        tertiaryColour: '#00458a'
    }),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  declarations: [AutorizacionPlanComponent, ReporteComponent, ResultadoComponentAutoriza]
})
export class AutorizacionPlanModule { }
