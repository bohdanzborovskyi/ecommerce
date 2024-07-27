import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../models/appState";
import {CartService} from "../state/cart/cart.service";

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
export class CartComponent implements OnInit{
  cart:any

  constructor(private router:Router,
              private store: Store<AppState>,
              protected cartService: CartService) {
  }


  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }

  ngOnInit(): void {
    this.cartService.getCart()
    this.store.pipe(select((store)=>store.cart)).subscribe((cart)=>{
      this.cart = cart;
      console.log("cart",this.cart);
    });
  }
}
