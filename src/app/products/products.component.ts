import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {filters, singleFilter} from "../data/filter_data";
import {NgForOf, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton} from "@angular/material/radio";
import {men_pants} from "../data/men/men_pants";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
    MatRadioButton,
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  filterData: any
  singleFilterData: any
  menPants: any

  constructor(private router: Router ,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.filterData = filters
    this.singleFilterData = singleFilter
    this.menPants = men_pants
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = this.activateRoute.snapshot.queryParams
    const filterValues = queryParams[sectionId] ?
      ((queryParams[sectionId] as Array<string>).length > 0 ? queryParams[sectionId].split(",") : []) : []
    const valueIndex = filterValues.indexOf(value)
    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1)
    } else {
      filterValues.push(value)
    }
    let additionalQueryParams: Params = []
    if(filterValues.length > 0){
      additionalQueryParams[sectionId]=filterValues.join(",");
    }else{
      additionalQueryParams[sectionId] = [];
    }
    this.router.navigate([], {
      queryParams: additionalQueryParams,
      queryParamsHandling: "merge"});
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = this.activateRoute.snapshot.queryParams
    let additionalQueryParams : Params = []
    additionalQueryParams[sectionId] = value;
    this.router.navigate([], {
      queryParams:additionalQueryParams,
      queryParamsHandling: "merge"});
  }
}
