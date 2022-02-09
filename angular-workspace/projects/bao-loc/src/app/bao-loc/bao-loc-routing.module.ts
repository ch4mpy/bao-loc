import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaoLocPage } from './bao-loc.page';

const routes: Routes = [
  {
    path: '',
    component: BaoLocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaoLocPageRoutingModule {}
