import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {filters, singleFilter} from "../data/filter_data";
import {NgForOf, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatIcon,
    NgForOf,
    MatCheckbox,
    NgIf,
    MatRadioButton
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  filterData:any
  singleFilterData:any

  ngOnInit(): void {
    this.filterData = filters
    this.singleFilterData = singleFilter
  }

}
