import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { BajaPlanComponent } 		from './baja-plan.component';
import { ValidaArchivoComponent } 	from './valida-archivo.component';
import { ResultadoComponent } 		from './resultado.component';
import { BajaPlanRoutingModule } 	from './baja-plan-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule } 		from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BajaPlanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
        backdropBackgroundColour: 'rgba(255,255,255,0.4)', 
        backdropBorderRadius: '1px',
        primaryColour: '#00458a', 
        secondaryColour: '#00458a', 
        tertiaryColour: '#00458a'
    })
  ],
  declarations: [BajaPlanComponent, ValidaArchivoComponent, ResultadoComponent]
})
export class BajaPlanModule { }
