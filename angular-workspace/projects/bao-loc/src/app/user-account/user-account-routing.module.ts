import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../is-authenticated.guard';

import { UserAccountScreen } from './user-account.screen';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard],
    component: UserAccountScreen
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountPageRoutingModule {}
