import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CicloComponent } from './ciclo.component';
import { CicloEditComponent } from './ciclo-edit.component';


const routes: Routes = [
    {
        path: '',
        component: CicloComponent
    },
    {
        path: 'edit/:id',
        component: CicloEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CicloRoutingModule {}
