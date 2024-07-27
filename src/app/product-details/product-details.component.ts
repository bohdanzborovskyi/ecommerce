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
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../state/product/product.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../models/appState";
import {CartService} from "../state/cart/cart.service";

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
  product: any;
  productId: any


  constructor(private router: Router,
              private productService: ProductService,
              private activateRoute: ActivatedRoute,
              private store: Store<AppState>,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.relatedProducts = women_dress_2;
    let productId = this.activateRoute.snapshot.paramMap.get("id")
    this.productService.findProductsById(productId)
    this.productId = productId
    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
      this.product = product?.product
      console.log("related product", product.product)
    })
  }

  addToCart(product: any) {
    console.log('selected size', this.selectedSize);
    this.cartService.addItemToCart({productId:this.productId, size:this.selectedSize})
    this.cartService.getCart();
    this.router.navigate(['cart']);
  }
}
