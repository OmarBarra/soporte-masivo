import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionComponent } from './region.component';
import { RegionEditComponent } from './region-edit.component';


const routes: Routes = [
    {
        path: '',
        component: RegionComponent
    },
    {
        path: 'edit/:id',
        component: RegionEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegionRoutingModule {}
