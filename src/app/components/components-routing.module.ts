import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ValidaArchivoComponent } from './baja-plan/valida-archivo.component';
import { ValidaArchivoComponentCambio } from './cambio-plan/valida-archivo.component';

const routes: Routes = [
    {
        path: '',
        component: ComponentsComponent,
        children: [
          { path: '', redirectTo: 'inicio' },
          { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
          { path: 'baja-plan', loadChildren: './baja-plan/baja-plan.module#BajaPlanModule' },
          { path: 'cambio-plan', loadChildren: './cambio-plan/cambio-plan.module#CambioPlanModule' },
          { path: 'autorizacion', loadChildren: './autorizacion-plan/autorizacion-plan.module#AutorizacionPlanModule' },
          { path: 'producto', loadChildren: './catalogos/producto/producto.module#ProductoModule' },
          { path: 'region', loadChildren: './catalogos/region/region.module#RegionModule' },
          { path: 'ciclo', loadChildren: './catalogos/ciclo/ciclo.module#CicloModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule {}
