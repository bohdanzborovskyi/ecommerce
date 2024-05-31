import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    MatIcon,
    NgIf,
    MatDivider
  ],
  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.css'
})
export class OrderTrackerComponent {

  @Input() activeStep: any;
  @Input() steps: any;

}
