import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BASE_API_URL} from "../../config/api";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, of} from "rxjs";
import {findProductsByCategorySuccess, findProductsByIdFailure, findProductsByIdSuccess} from "./product.action";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute) {
  }

  API_BASE_URL = BASE_API_URL + "/api/products/";

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  findProductsByCategory(reqData: any) {
    const {colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize} = reqData;
    let params = new HttpParams().set("color", colors).set("category", category).set("size", sizes).set("minPrice", minPrice).set("maxPrice", maxPrice).set("minDiscount", minDiscount).set("stock", stock).set("sort", sort).set("pageNumber", pageNumber).set("pageSize", pageSize);
    const headers = this.getHeaders();
    return this.http.get(this.API_BASE_URL, {headers,params}).pipe(
      map((data: any) => {
        console.log("products", data);
        return findProductsByCategorySuccess({payload:data});
      }),
      catchError((error:any) =>{
        return of(findProductsByIdFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message));
      })
    ).subscribe(action => {
      this.store.dispatch(action);
    });
  }

  findProductsById(productId: any) {
    const headers = this.getHeaders();
    return this.http.get(this.API_BASE_URL + "id/" + productId, {headers}).pipe(
      map((data: any) => {
        console.log("product", data);
        return findProductsByIdSuccess({payload:data});
      }),
      catchError((error:any) =>{
        return of(findProductsByIdFailure(
          error.response && error.response.data.message ? error.response.data.message : error.message));
      })
    ).subscribe(action => {
      this.store.dispatch(action);
    });
  }
}
