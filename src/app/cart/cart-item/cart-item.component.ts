import {Component, Input} from '@angular/core';
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {CartService} from "../../state/cart/cart.service";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MatMiniFabButton,
    MatIconButton,
    MatIcon,
    MatButton,
    NgIf
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() showButton: any;
  @Input() cartItem: any;

  constructor(private cartService: CartService) {
  }

  updateCartItem(quantity: number) {
    this.cartService.updateCartItem(
      {cartItemId: this.cartItem.id,
      quantity:this.cartItem.quantity + quantity});
  }

  removeCartItem() {
    this.cartService.removeCartItem(this.cartItem.id)
  }
}
