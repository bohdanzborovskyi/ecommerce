import {Component, OnInit} from '@angular/core';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ProductReviewCardComponent} from "./product-review-card/product-review-card.component";
import {NgForOf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {women_dress_2} from "../data/women/women_dress_2";
import {ProductCardComponent} from "../products/product-card/product-card.component";
import {StarRatingComponent} from "../star-rating/star-rating.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatButton,
    ProductReviewCardComponent,
    NgForOf,
    MatProgressBar,
    ProductCardComponent,
    StarRatingComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  selectedSize: any;
  reviews = [1,1,1,1,1];
  relatedProducts: any;

  ngOnInit() {
    this.relatedProducts = women_dress_2;
  }

  addToCart() {
    console.log('selected size', this.selectedSize);
  }
}
