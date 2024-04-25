import {Component, Input} from '@angular/core';
import {HomeProductCardComponent} from "../home-product-card/home-product-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [
    HomeProductCardComponent,
    NgForOf
  ],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent {

  @Input() title: any;
  @Input() products: any;



}
