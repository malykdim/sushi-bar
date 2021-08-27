import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)},
    {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
    {path: 'signup', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
    {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    {path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
