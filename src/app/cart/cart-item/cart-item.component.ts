import {Component, Input} from '@angular/core';
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

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

  updateCartItem(number: number) {
    console.log("number", number);
  }

  removeCartItem() {
    console.log("removeCartItem");
  }
}
