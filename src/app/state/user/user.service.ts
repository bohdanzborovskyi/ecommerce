import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_API_URL} from "../../config/api";
import {Store} from "@ngrx/store";
import {catchError, map, of} from "rxjs";
import {getUserProfileFailure, getUserProfileSuccess, logoutSuccess} from "./user.actions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = BASE_API_URL + "/api/users";

  headers:any;

  constructor(private http: HttpClient, private store: Store) {

  }

  getUserProfile(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
    return this.http.get(this.apiUrl + "/profile", {headers:headers}).pipe(
      map((user:any) => {
        console.log("user profile", user);

        return getUserProfileSuccess({userProfile: user});
      }),
      catchError((error)=>{
        return of(getUserProfileFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message));
      })
    ).subscribe((action) =>{
      this.store.dispatch(action);
    })
  }

  logout(){
    localStorage.removeItem("jwt");
    this.store.dispatch(logoutSuccess())
  }
}
