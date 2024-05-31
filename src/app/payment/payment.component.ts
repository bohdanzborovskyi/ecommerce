import { Component } from '@angular/core';
import {AddressCardComponent} from "../checkout/address-card/address-card.component";
import {CartItemComponent} from "../cart/cart-item/cart-item.component";
import {MatDivider} from "@angular/material/divider";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

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
export class PaymentComponent {
  products = [1,1,1,1];

}
