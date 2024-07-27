import {Component, OnInit} from '@angular/core';
import {OrderService} from "../state/order/order.service";
import {PaymentService} from "../state/payment/payment.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../models/appState";
import {NgForOf} from "@angular/common";
import {AddressCardComponent} from "../checkout/address-card/address-card.component";

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [
    NgForOf,
    AddressCardComponent
  ],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{

  private orderId:any
  private payerId:any
  private paymentId:any
  protected order:any

  constructor(private orderService: OrderService,
              private paymentService: PaymentService,
              private route: ActivatedRoute,
              private store: Store<AppState>){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.orderId = params['order_id'];
      this.payerId = params['PayerID'];
      this.paymentId = params['paymentId'];
    })
    this.paymentService.completePayment(this.payerId, this.orderId, this.paymentId);
    this.store.select(store => store.order).subscribe(order => {
      this.order = order.order;
    })
  }

}
