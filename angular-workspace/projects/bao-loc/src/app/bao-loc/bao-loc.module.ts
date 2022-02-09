import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaoLocPageRoutingModule } from './bao-loc-routing.module';

import { BaoLocPage } from './bao-loc.page';
import { CheatDialogComponent } from './cheat-dialog.component';
import { SolutionsDialogComponent } from './solutions-dialog.component';
import { RulesDialogComponent } from './rules-dialog.component';
import { SolutionsEditComponent } from './solution-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BaoLocPageRoutingModule
  ],
  declarations: [BaoLocPage, CheatDialogComponent, RulesDialogComponent, SolutionsDialogComponent, SolutionsEditComponent]
})
export class BaoLocPageModule {}
