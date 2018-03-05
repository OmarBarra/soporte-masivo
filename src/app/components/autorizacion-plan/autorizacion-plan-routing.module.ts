import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizacionPlanComponent } from './autorizacion-plan.component';
import { ReporteComponent } from './reporte.component';
import { ResultadoComponentAutoriza } from './resultado.component';

const routes: Routes = [
    {
        path: '',
        component: AutorizacionPlanComponent
    },
    {
        path: 'reporte',
        component: ReporteComponent
    },
    {
        path: 'resultado',
        component: ResultadoComponentAutoriza
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutorizacionPlanRoutingModule {}
