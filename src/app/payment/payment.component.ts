import {Component, OnInit} from '@angular/core';
import {AddressCardComponent} from "../checkout/address-card/address-card.component";
import {CartItemComponent} from "../cart/cart-item/cart-item.component";
import {MatDivider} from "@angular/material/divider";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../models/appState";
import {extractAllParams} from "@angular/compiler-cli/src/ngtsc/docs/src/function_extractor";
import {OrderService} from "../state/order/order.service";
import {PaymentService} from "../state/payment/payment.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    AddressCardComponent,
    CartItemComponent,
    MatDivider,
    NgIf,
    MatButton,
    NgForOf
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  order:any

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      const orderId = params['order_id'];
      this.orderService.getOrderById(orderId);
    })
    this.store.select(store => store.order).subscribe(order => {
      this.order = order.order;
      console.log('order' ,order);
    })
  }


  redirectToPayment() {
    console.log("orderId", this.order);
    if(this.order.id){
      this.paymentService.createPayment(this.order.id);
    }
  }
}
