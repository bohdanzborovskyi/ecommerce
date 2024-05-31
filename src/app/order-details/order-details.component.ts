import { Component } from '@angular/core';
import {AddressCardComponent} from "../checkout/address-card/address-card.component";
import {NgForOf} from "@angular/common";
import {OrderCardComponent} from "../order/order-card/order-card.component";
import {OrderTrackerComponent} from "../order/order-tracker/order-tracker.component";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    AddressCardComponent,
    NgForOf,
    OrderCardComponent,
    OrderTrackerComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orders = [1,1,1];
  steps = [
    {id:0, title:"PLACED", isCompleted:true},
    {id:1, title:"CONFIRMED", isCompleted:true},
    {id:2, title:"SHIPPED", isCompleted:false},
    {id:3, title:"DELIVERED", isCompleted:false}
  ];

}
