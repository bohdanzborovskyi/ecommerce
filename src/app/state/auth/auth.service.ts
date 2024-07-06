import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../config/api";
import {Store} from "@ngrx/store";
import {catchError, map, of} from "rxjs";
import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "./auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = BASE_API_URL + "/auth";

  constructor(private http: HttpClient, private store: Store) {}

  login(loginData:any){
    return this.http.post(this.apiUrl + "/signin", loginData).pipe(
      map((user:any) => {
        console.log("logged in", user);
        if(user.jwt){
          localStorage.setItem("jwt", user.jwt);
        }
        return loginSuccess({user: user});
      }),
      catchError((error)=>{
        return of(loginFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message));
      })
    ).subscribe((action) =>{
      this.store.dispatch(action);
    })
  }

  register(user:any){
    return this.http.post(this.apiUrl + "/signup", user).pipe(
      map((user:any) => {
        console.log("register user", user);
        if(user.jwt){
          localStorage.setItem("jwt", user.jwt);
        }
        return registerSuccess({user: user});
      }),
      catchError((error)=>{
        return of(registerFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message));
      })
    ).subscribe((action) =>{
      this.store.dispatch(action);
    })
  }

}
