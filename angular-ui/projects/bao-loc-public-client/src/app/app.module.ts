import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {
  BaoLocApiModule,
  BaoLocConfiguration,
  BaoLocConfigurationParameters,
} from '@c4-soft/bao-loc-api';
import {
  BaoLocCommonsModule,
  SolutionService,
  UserService,
} from '@c4-soft/bao-loc-commons';
import { AuthConfigModule } from './auth/auth-config.module';
import { PublicClientUserService } from './auth/user.service';
import { BruteForceSolutionService } from './brute-foce-solution.service';

export function baoLocApiConfigFactory(): BaoLocConfiguration {
  const params: BaoLocConfigurationParameters = {
    basePath: '/api/bao-loc',
  };
  return new BaoLocConfiguration(params);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BaoLocApiModule.forRoot(baoLocApiConfigFactory),
    BaoLocCommonsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthConfigModule,
  ],
  providers: [
    { provide: UserService, useClass: PublicClientUserService },
    { provide: SolutionService, useClass: BruteForceSolutionService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
