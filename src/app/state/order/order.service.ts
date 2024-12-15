import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {BASE_API_URL} from "../../config/api";
import {catchError, map, of} from "rxjs";
import {
  createOrderFailure,
  createOrderSuccess,
  getOrderByIdFailure,
  getOrderByIdSuccess,
  getOrderHistoryFailure,
  getOrderHistorySuccess
} from "./order.action";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API_BASE_URL = BASE_API_URL + "/api/orders/";
  private API_BASE_ADMIN_URL = BASE_API_URL + "/api/admin/orders/";

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute) {
  }

  createOrder(reqData:any){
    console.log("order data", reqData);
    const headers = new HttpHeaders().
    set("Authorization", "Bearer " + localStorage.getItem("jwt")).
    set("Content-Type", "application/json");
    return this.http.post(this.API_BASE_URL, reqData, {headers: headers}).pipe(
      map((data:any) => {
        if(data.id){
          this.router.navigate(
            ['/checkout/payment/', data.id],
            {queryParams: {step:'3',order_id:data.id}});
        }
        console.log("created order", data);
        return createOrderSuccess({order:data})
      }),
      catchError((error:any) => {
        return of(createOrderFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message
        ))
      })
    ).subscribe(action => {
      this.store.dispatch(action);
    })
  }

  getOrderById(orderId:string){
    const url = this.API_BASE_URL + orderId;
    const headers = new HttpHeaders().
    set("Authorization", "Bearer " + localStorage.getItem("jwt"));
    return this.http.get(url, {headers: headers}).pipe(
      map((data:any) => {
        console.log("order by id", data);
        return getOrderByIdSuccess({order:data})
      }),
      catchError((error:any) => {
        return of(getOrderByIdFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message
        ))
      })
    ).subscribe(action => {
      this.store.dispatch(action);
    })
  }

  getOrderHistory(){
    const url = this.API_BASE_URL + 'user';
    const headers = new HttpHeaders().
    set("Authorization", "Bearer " + localStorage.getItem("jwt"));

    return this.http.get<any>(url, {headers: headers}).pipe(
      map((data:any) => {
        console.log("user order history", data);
        return getOrderHistorySuccess({orders:data})
      }),
      catchError((error:any) => {
        return of(getOrderHistoryFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message
        ))
      })
    ).subscribe(action => {
      this.store.dispatch(action);
    })
  }

  deliverOrder(orderId: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.http.get(this.API_BASE_ADMIN_URL + orderId + "/deliver", {headers:headers}).pipe(
      catchError((err:any) => {
        console.log("deliver order error", err);
        return of(err.message)
      })
    ).subscribe(data => {
      console.log("deliver order", data);
    })
  }

  shipOrder(orderId: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.http.get(this.API_BASE_ADMIN_URL + orderId + "/ship", {headers:headers}).pipe(
      catchError((err:any) => {
        console.log("ship order error", err);
        return of(err.message)
      })
    ).subscribe(data => {
      console.log("ship order", data);
    })
  }

  confirmOrder(orderId: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.http.get(this.API_BASE_ADMIN_URL + orderId + "/confirm", {headers:headers}).pipe(
      catchError((err:any) => {
        console.log("confirm order error", err);
        return of(err.message)
      })
    ).subscribe(data => {
      console.log("confirm order", data);
    })
  }

  cancelOrder(orderId: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.http.get(this.API_BASE_ADMIN_URL + orderId + "/cancel", {headers:headers}).pipe(
      catchError((err:any) => {
        console.log("cancel order error", err);
        return of(err.message)
      })
    ).subscribe(data => {
      console.log("cancel order", data);
    })
  }
}
