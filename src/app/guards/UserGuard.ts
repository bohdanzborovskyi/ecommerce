import {inject, Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "../state/auth/auth.service";
import {UserService} from "../state/user/user.service";
import {map, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate{

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isUser().pipe(
      take(1),
      map((isUser:boolean) => {
        console.log("IsUser", isUser);
        if(!isUser){
          return this.router.parseUrl("/products");
        }
        return isUser;
      })
    )
  }


}
