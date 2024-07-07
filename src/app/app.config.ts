import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import {authReducer} from "./state/auth/auth.reducer";
import {userReducer} from "./state/user/user.reducer";
import {HttpClientModule} from "@angular/common/http";
import {productReducer} from "./state/product/product.reducer";
import {cartReducer} from "./state/cart/cart.reducer";
import {orderReducer} from "./state/order/order.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({name:'auth',reducer:authReducer}),
    provideState({name:'user',reducer:userReducer}),
    provideState({name:'product',reducer:productReducer}),
    provideState({name:'cart',reducer:cartReducer}),
    provideState({name:'order',reducer:orderReducer}),
    importProvidersFrom(HttpClientModule)
  ]
};
