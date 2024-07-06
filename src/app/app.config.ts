import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import {authReducer} from "./state/auth/auth.reducer";
import {userReducer} from "./state/user/user.reducer";
import {HttpClientModule} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({name:'auth',reducer:authReducer}),
    provideState({name:'user',reducer:userReducer}),
    importProvidersFrom(HttpClientModule)
  ]
};
