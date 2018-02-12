import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ValidaArchivoComponent } from './baja-plan/valida-archivo.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'baja-plan' },
          { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
          { path: 'baja-plan', loadChildren: './baja-plan/baja-plan.module#BajaPlanModule' },
          { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
