import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {OrderCardComponent} from "./order-card/order-card.component";
import {Router} from "@angular/router";

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
export class OrderComponent {
  orderFilter = [
    {value:"on_the_way", label:"On the way"},
    {value:"delivered", label:"Delivered"},
    {value:"cancelled", label:"Cancelled"},
    {value:"returned", label:"Returned"}
  ];
  orders = [[1,1,1,1], [1,1,1,1]];

  constructor(private router: Router) {
  }

  // navigateToOrderDetails =(id:Number) =>{
  //   this.router.navigate(['order/${id}']);
  // }

  navigateToOrderDetails =() =>{
    this.router.navigate(['order/2']);
  }

}
