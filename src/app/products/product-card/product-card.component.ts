import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: any;

  constructor(private router: Router) {
  }

  calculatePercentage(firstPrice: number, secondPrice: number):number {
    return Math.round((secondPrice/firstPrice)*100);
  }

  navigate(){
    this.router.navigate([`product-details/${this.product.id}`]);
  }

}
