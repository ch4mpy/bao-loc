import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule)
  },
  {
    path: 'bao-loc',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./bao-loc/bao-loc.module').then( m => m.BaoLocPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: '**',
    redirectTo: 'info',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
