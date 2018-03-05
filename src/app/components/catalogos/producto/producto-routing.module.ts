import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { ProductoEditComponent } from './producto-edit.component';


const routes: Routes = [
    {
        path: '',
        component: ProductoComponent
    },
    {
        path: 'edit/:id',
        component: ProductoEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductoRoutingModule {}
