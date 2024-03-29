import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { translateBrowserLoaderFactory } from './translate-loader-browser';
import { TransferState } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './core.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './states/auth/auth.effects';
import { SettingsEffects } from './states/settings/settings.effects';

import { environment } from 'src/environments/environment';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-has-loaded-once.guard';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    }),

    // ngrx
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, SettingsEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'mathis-page'
        }),

    // other
    ScrollingModule,
  ],
  providers: [TransferState],
  exports: [TranslateModule]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
