import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoGrupoComponent } from './tipo-grupo.component';
import { TipoGrupoEditComponent } from './tipo-grupo-edit.component';


const routes: Routes = [
    {
        path: '',
        component: TipoGrupoComponent
    },
    {
        path: 'edit/:id',
        component: TipoGrupoEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoGrupoRoutingModule {}
