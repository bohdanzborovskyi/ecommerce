import { Component } from '@angular/core';
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MatMiniFabButton,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  updateCartItem(number: number) {
    console.log("number", number);
  }

  removeCartItem() {
    console.log("removeCartItem");
  }
}
