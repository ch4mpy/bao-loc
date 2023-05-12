import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { BaoLocConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class BaoLocApiModule {
    public static forRoot(configurationFactory: () => BaoLocConfiguration): ModuleWithProviders<BaoLocApiModule> {
        return {
            ngModule: BaoLocApiModule,
            providers: [ { provide: BaoLocConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: BaoLocApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('BaoLocApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
