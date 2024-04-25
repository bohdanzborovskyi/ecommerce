import {Component, OnInit} from '@angular/core';
import {MainCarouselComponent} from "./main-carousel/main-carousel.component";
import {HomeProductCardComponent} from "./home-product-card/home-product-card.component";
import {ProductSliderComponent} from "./product-slider/product-slider.component";
import {men_jeans} from "../data/men/men_jeans";
import {women_gouns} from "../data/women/women_gouns";
import {women_dress} from "../data/women/women_dress";
import {men_kurta} from "../data/men/men_kurta";
import {men_shoes} from "../data/men/men_shoes";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainCarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  menJeans:any
  womenGouns:any
  womenDress:any
  menKurta:any
  mensShoes:any

  ngOnInit(): void {
    this.menJeans = men_jeans.slice(0,5)
    this.womenGouns = women_gouns.slice(0,5)
    this.womenDress = women_dress.slice(0,5)
    this.menKurta = men_kurta.slice(0,5)
    this.mensShoes = men_shoes.slice(0,5)
  }



}
