import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ValidaArchivoComponent } from './baja-plan/valida-archivo.component';

const routes: Routes = [
    {
        path: '',
        component: ComponentsComponent,
        children: [
          { path: '', redirectTo: 'inicio' },
          { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
          { path: 'baja-plan', loadChildren: './baja-plan/baja-plan.module#BajaPlanModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule {}
