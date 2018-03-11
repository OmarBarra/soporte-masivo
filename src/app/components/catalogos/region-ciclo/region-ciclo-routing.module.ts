import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionCicloComponent } from './region-ciclo.component';
import { RegionCicloEditComponent } from './region-ciclo-edit.component';


const routes: Routes = [
    {
        path: '',
        component: RegionCicloComponent
    },
    {
        path: 'edit/:id',
        component: RegionCicloEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegionCicloRoutingModule {}
