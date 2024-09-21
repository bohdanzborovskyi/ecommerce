import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {OrderCardComponent} from "./order-card/order-card.component";
import {Router} from "@angular/router";
import {OrderService} from "../state/order/order.service";
import {State, Store} from "@ngrx/store";
import {AppState} from "../models/appState";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgForOf,
    MatCheckbox,
    OrderCardComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orderFilters = [
    {value: "PENDING", label: "Pending", disabled: false},
    {value: "DELIVERED", label: "Delivered", disabled: false},
    {value: "SHIPPED", label: "Shipped", disabled: false},
    {value: "CONFIRMED", label: "Confirmed", disabled: false},
    {value: "PLACED", label: "Placed", disabled: false},
    {value: "CANCELED", label: "Canceled", disabled: false}
  ];
  orders: any[] = [];
  allOrders: any[] = [];

  constructor(private router: Router,
              private orderService: OrderService,
              private store: Store<AppState>) {
  }

  navigateToOrderDetails = (id: Number) => {
    this.router.navigate(['order/${id}']);
  }

  ngOnInit(): void {
    this.orderService.getOrderHistory();
    this.store.select(state => state.order).subscribe(order => {
      this.allOrders = order.orders;
      this.orders = order.orders;
      console.log(this.orders);
    })
  }

  filterOrders(filter: string) {
    this.orderFilters.forEach(orderFilter => {
      if (orderFilter.value === filter) {
        orderFilter.disabled = !orderFilter.disabled
      }
    })
    if(this.orderFilters.some(orderFilter => orderFilter.disabled)) {
      this.orders = this.allOrders.filter(
        order => {
          return this.orderFilters.some(orderFilter =>
            (orderFilter.value === order.orderStatus && orderFilter.disabled));
        })
    }else{
      this.orders = this.allOrders
    }
  }
}
