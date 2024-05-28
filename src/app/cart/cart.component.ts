import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    CartItemComponent,
    NgIf,
    MatDivider,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart = [1,1,1];

  constructor(private router:Router) {
  }


  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
