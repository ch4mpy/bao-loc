import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from './about.page';
import { BaoLocPage } from './bao-loc.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'problem',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'problem',
    component: BaoLocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaoLocRoutingModule { }
