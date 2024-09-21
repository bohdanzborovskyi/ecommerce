import {Injectable} from "@angular/core";
import {BASE_API_URL} from "../../config/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {createAction, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, of} from "rxjs";
import {
  addItemToCartFailure,
  addItemToCartSuccess,
  getCartFailure,
  getCartSuccess, removeCartItemFailure,
  removeCartItemSuccess, removeWholeCartFailure, removeWholeCartSuccess, updateCartItemFailure, updateCartItemSuccess
} from "./cart.action";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  API_BASE_URL = BASE_API_URL + '/api';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute) {
  }

  addItemToCart(reqData:any){
    const url = this.API_BASE_URL + '/cart/add';
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.put(url, JSON.stringify(reqData), {headers}).pipe(
      map((data:any) => {
        console.log("adding item to cart", data);
        return addItemToCartSuccess({payload:data})
      }),
      catchError((error:any) => {
        return of(addItemToCartFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe((action) =>{
      this.store.dispatch(action);
    })
  }

  getCart(){
    const url = this.API_BASE_URL + '/cart/';
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.get(url, {headers:headers}).pipe(
      map((data:any) => {
        console.log("get cart", data);
        return getCartSuccess({payload:data});
      }),
      catchError((error) => {
        return of(getCartFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe( action => {
      this.store.dispatch(action);
    })
  }

  removeCartItem(carItemId:number){
    const url = this.API_BASE_URL + '/cart/remove/' + carItemId;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.delete(url, {headers:headers}).pipe(
      map((data:any) => {
        console.log("remove cart item", data);
        return removeCartItemSuccess({cartItemId:data});
      }),
      catchError((error) => {
        return of(removeCartItemFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe( action => {
      this.store.dispatch(action);
    })
  }

  updateCartItem(reqData:any){
    const url = this.API_BASE_URL + '/cart/update/' + reqData.cartItemId;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.put(url, reqData,{headers:headers}).pipe(
      map((data:any) => {
        console.log("update cart item", data);
        return updateCartItemSuccess({payload:data});
      }),
      catchError((error) => {
        return of(updateCartItemFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe( action => {
      this.store.dispatch(action);
    })
  }

  removeWholeCart(){
    const url = this.API_BASE_URL + '/cart/remove';
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.delete(url, {headers:headers}).pipe(
      map((data:any) => {
        return removeWholeCartSuccess({payload:data});
      }),
      catchError((error) => {
        return of(removeWholeCartFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe( action => {
      this.store.dispatch(action);
    })
  }
}
