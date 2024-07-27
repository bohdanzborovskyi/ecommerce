import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {BASE_API_URL} from "../../config/api";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {
  competePaymentFailure,
  competePaymentSuccess,
  createPaymentFailure,
  createPaymentSuccess
} from "./payment.action";
import {OrderService} from "../order/order.service";


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  API_BASE_URL = BASE_API_URL + '/api';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {
  }

  createPayment(orderId:any){
    const url = this.API_BASE_URL + '/payments/' + orderId;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");

    return this.http.get(url,{headers:headers}).pipe(
      map((data:any) => {
        console.log("created payment", data);
        if(data.paymentLinkUrl){
          window.location.href=data.paymentLinkUrl;
        }
        return createPaymentSuccess({order:data});
      }),
      catchError((error) => {
        return of(createPaymentFailure(
          error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        ))
      })
    ).subscribe( action => {
      this.store.dispatch(action);
    })
  }

  completePayment(payerId: any, orderId: any, paymentId:any) {
    const url = this.API_BASE_URL + '/payments/payment-success/' + orderId;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    return this.http.post(url,{payerId:payerId, paymentId:paymentId}, {headers:headers}).pipe(
      map((data:any) => {
        this.orderService.getOrderById(orderId);
        return competePaymentSuccess({order:data});
      }),
      catchError((error) => {
        return of(competePaymentFailure(
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
