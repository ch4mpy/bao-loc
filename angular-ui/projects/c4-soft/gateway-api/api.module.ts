import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { GatewayConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class GatewayApiModule {
    public static forRoot(configurationFactory: () => GatewayConfiguration): ModuleWithProviders<GatewayApiModule> {
        return {
            ngModule: GatewayApiModule,
            providers: [ { provide: GatewayConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: GatewayApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('GatewayApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
