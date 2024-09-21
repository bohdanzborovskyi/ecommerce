import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_API_URL} from "../../config/api";
import {Store} from "@ngrx/store";
import {catchError, map, of} from "rxjs";
import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "./auth.actions";
import {AppState} from "../../models/appState";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private user: any;

  private apiUrl = BASE_API_URL + "/auth";
  private apiUserUrl = BASE_API_URL + "/api/users";


  constructor(private http: HttpClient, private store: Store<AppState>, private userService: UserService) {
  }

  login(loginData:any){
    return this.http.post(this.apiUrl + "/login", loginData).pipe(
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
        if(user.jwt){
          console.log("register user", user);
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


  isUser(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
    return this.http.get<boolean>(this.apiUserUrl + "/isUser", {headers: headers})
  }

  isAdmin(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
    return this.http.get<boolean>(this.apiUserUrl + "/isAdmin", {headers: headers})
  }
}
