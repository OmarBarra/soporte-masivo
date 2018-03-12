import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioEditComponent } from './usuario-edit.component';


const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent
    },
    {
        path: 'edit/:id',
        component: UsuarioEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
