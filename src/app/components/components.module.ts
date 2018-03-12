import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ComponentsComponent } from './components.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegionService } from '../services/region.service';
import { CicloService } from '../services/ciclo.service';
import { PerfilService } from '../services/perfil.service';


@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    TranslateModule,
    NgbDropdownModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [ComponentsComponent, HeaderComponent, SidebarComponent],
  providers: [RegionService, CicloService, PerfilService]
})
export class ComponentsModule { }
