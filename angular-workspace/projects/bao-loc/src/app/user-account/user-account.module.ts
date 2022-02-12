import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccountPageRoutingModule } from './user-account-routing.module';

import { UserAccountScreen } from './user-account.screen';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAccountPageRoutingModule
  ],
  declarations: [UserAccountScreen]
})
export class UserAccountPageModule {}
