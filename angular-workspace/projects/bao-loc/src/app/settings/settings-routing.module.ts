import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsScreen } from './settings.screen';

const routes: Routes = [
  {
    path: '',
    component: SettingsScreen
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
