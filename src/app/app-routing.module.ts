import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './components/shared';

const routes: Routes = [
    // { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: './components/components.module#ComponentsModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './components/signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './components/server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './components/access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './components/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
