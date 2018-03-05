import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { CambioPlanComponent } 		from './cambio-plan.component';
import { ValidaArchivoComponentCambio } 	from './valida-archivo.component';
import { ResultadoComponentCambio } 		from './resultado.component';
import { CambioPlanRoutingModule } 	from './cambio-plan-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule } 		from "@angular/forms";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    CambioPlanRoutingModule,
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
  declarations: [CambioPlanComponent, ValidaArchivoComponentCambio, ResultadoComponentCambio]
})
export class CambioPlanModule { }
