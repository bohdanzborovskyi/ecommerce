import {Component, OnInit} from '@angular/core';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {RouterLink} from "@angular/router";
import {carouselData} from "../../data/mainCarouselData";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [
    MdbCarouselModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent implements OnInit{
  carouselData: any;
  activeSlideIndex = 0

  ngOnInit(): void {
    this.carouselData = carouselData
  }

}
