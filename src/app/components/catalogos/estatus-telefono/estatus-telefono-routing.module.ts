import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstatusTelefonoComponent } from './estatus-telefono.component';
import { EstatusTelefonoEditComponent } from './estatus-telefono-edit.component';


const routes: Routes = [
    {
        path: '',
        component: EstatusTelefonoComponent
    },
    {
        path: 'edit/:id',
        component: EstatusTelefonoEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstatusTelefonoRoutingModule {}
