import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcesoComponent } from './proceso.component';
import { ProcesoEditComponent } from './proceso-edit.component';


const routes: Routes = [
    {
        path: '',
        component: ProcesoComponent
    },
    {
        path: 'edit/:id',
        component: ProcesoEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesoRoutingModule {}
