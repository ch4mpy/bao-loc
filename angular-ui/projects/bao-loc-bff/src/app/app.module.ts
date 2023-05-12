import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  BaoLocApiModule,
  BaoLocConfiguration,
  BaoLocConfigurationParameters,
} from '@c4-soft/bao-loc-api';
import {
  GatewayApiModule,
  GatewayConfiguration,
  GatewayConfigurationParameters,
} from '@c4-soft/gateway-api';
import { BaoLocCommonsModule, SolutionService, UserService } from '@c4-soft/bao-loc-commons';
import { BffUserService } from './user.service';
import { BruteForceSolutionService } from './brute-foce-solution.service';

export function baoLocApiConfigFactory(): BaoLocConfiguration {
  const params: BaoLocConfigurationParameters = {
    basePath: '/bff/bao-loc',
  };
  return new BaoLocConfiguration(params);
}

export function gatewayApiConfigFactory(): GatewayConfiguration {
  const params: GatewayConfigurationParameters = {
    basePath: '',
  };
  return new GatewayConfiguration(params);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BaoLocApiModule.forRoot(baoLocApiConfigFactory),
    GatewayApiModule.forRoot(gatewayApiConfigFactory),
    BaoLocCommonsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: UserService, useClass: BffUserService },
    { provide: SolutionService, useClass: BruteForceSolutionService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
