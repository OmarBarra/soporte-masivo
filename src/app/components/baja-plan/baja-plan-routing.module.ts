import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BajaPlanComponent } from './baja-plan.component';
import { ValidaArchivoComponent } from './valida-archivo.component';
import { ResultadoComponent } from './resultado.component';

const routes: Routes = [
    {
        path: '',
        component: BajaPlanComponent
    },
    {
        path: 'valida-archivo',
        component: ValidaArchivoComponent
    },
    {
        path: 'resultado',
        component: ResultadoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BajaPlanRoutingModule {}
