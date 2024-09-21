import {Component, OnInit} from '@angular/core';
import {OrderService} from "../state/order/order.service";
import {PaymentService} from "../state/payment/payment.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../models/appState";
import {NgForOf} from "@angular/common";
import {AddressCardComponent} from "../checkout/address-card/address-card.component";
import {OrderTrackerComponent} from "../order/order-tracker/order-tracker.component";

@Component({
  selector: 'app-payment-success',
  standalone: true,
    imports: [
        NgForOf,
        AddressCardComponent,
        OrderTrackerComponent
    ],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{

  private orderId:any
  private payerId:any
  private paymentId:any
  protected order:any

  steps = [
    {id:0, title:"PLACED", isCompleted:true},
    {id:1, title:"CONFIRMED", isCompleted:true},
    {id:2, title:"SHIPPED", isCompleted:false},
    {id:3, title:"DELIVERED", isCompleted:false}
  ];

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
