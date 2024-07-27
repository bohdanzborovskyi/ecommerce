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
import {ProductService} from "../state/product/product.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../models/appState";

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
  products: any[] = []
  levelThree: any

  constructor(private router: Router ,
              private activateRoute: ActivatedRoute,
              private productService: ProductService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.filterData = filters
    this.singleFilterData = singleFilter
    this.menPants = men_pants

    this.activateRoute.paramMap.subscribe(params => {
      this.levelThree = params.get("levelThree")
      var reqData = {
        category: params.get("levelThree"),
        colors:[],
        sizes:[],
        minPrice:0,
        maxPrice:100000,
        minDiscount:0,
        pageNumber:0,
        pageSize:10,
        stock:null
      };
      this.productService.findProductsByCategory(reqData);
    })

    this.activateRoute.queryParams.subscribe(params => {
      const color = params['color'];
      const sizes = params['sizes'];
      const price = params['price'];
      const discount = params['discount'];
      const stock = params['stock'];
      const sort = params['sort'];
      const pageNumber = params['pageNumber'];
      const minPrice = price?.split("-")[0];
      const maxPrice = price?.split("-")[1];

      var reqData = {
        category: this.levelThree,
        colors:color? [color].join(","): [],
        sizes:sizes ? sizes : [],
        minPrice:minPrice ? minPrice : 0,
        maxPrice:maxPrice ? maxPrice : 100000,
        minDiscount:discount?discount:0,
        pageNumber:pageNumber? pageNumber : 0,
        pageSize:10,
        stock:stock? stock : null,
        sort: sort ? sort: 'price_low'
      };
      this.productService.findProductsByCategory(reqData)
    })

    this.store.pipe(select((store) => store.product)).subscribe(product => {
      this.products = product.products.content
      console.log("store", this.products)
    })
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
