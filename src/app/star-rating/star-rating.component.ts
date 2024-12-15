import {Component} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    NgForOf
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  initialRating = 1;
  maxRating = 5;
  currentRating = 0;
  stars:any;

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_,i) => i+1);
    this.currentRating = this.initialRating;
  }

  rate(rating: number) {
    this.currentRating = rating;
  }

}
