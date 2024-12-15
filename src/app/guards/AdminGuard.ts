import {CanActivateFn} from "@angular/router";

import {AuthService} from "../state/auth/auth.service";
import {inject} from "@angular/core";
import {map, take} from "rxjs";


export const AdminGuard : CanActivateFn = (route, state) => {
  return inject(AuthService).isAdmin().pipe(
    take(1),
    map((isAdmin) => {
      if(isAdmin){
        return isAdmin;
      }else{
        return isAdmin;
      }
    })
  )
}

