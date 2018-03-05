import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambioPlanComponent } from './cambio-plan.component';
import { ValidaArchivoComponentCambio } from './valida-archivo.component';
import { ResultadoComponentCambio } from './resultado.component';

const routes: Routes = [
    {
        path: '',
        component: CambioPlanComponent
    },
    {
        path: 'valida-archivo',
        component: ValidaArchivoComponentCambio
    },
    {
        path: 'resultado',
        component: ResultadoComponentCambio
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CambioPlanRoutingModule {}
