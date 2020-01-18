import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SolutionsPageComponent } from './solutions-page/solutions-page.component';
import { SolutionEditFormComponent } from './solution-edit-form/solution-edit-form.component';
import { SolutionEditGuard } from './solution-edit.guard';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'display', component: SolutionsPageComponent },
  { path: 'edit', children: [{
	  	path: '',
	  	canActivate: [ SolutionEditGuard ],
	  	component: SolutionEditFormComponent }]},
  { path: '**', component: LandingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
