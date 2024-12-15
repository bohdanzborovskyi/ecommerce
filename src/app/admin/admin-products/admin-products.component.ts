import {Component, inject, OnInit} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

  private apiUrl = BASE_API_URL + "/api/admin/products"
  protected products: any = [];
  totalPages: number[] = []
  readonly dialog = inject(MatDialog);
  private pageNumber = 0;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.retrieveProducts(this.pageNumber);
  }

  createPages(totalPages: number) {
    for(let i=0; i<totalPages; i++) {
      this.totalPages[i] = i+1;
    }
  }

  retrieveProducts(pageNumber: number) {
    this.pageNumber = pageNumber;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    let params = new HttpParams().set("pageSize",10).set("pageNumber", pageNumber);
    this.httpClient.get(this.apiUrl + "/all", {headers:headers,params:params}).pipe(
      map(data => {
        this.products = data;
        this.createPages(this.products.totalPages)
        console.log("admin products data: " , this.products);
      }),
      catchError( error => {
        return of(error.message)
      })
    ).subscribe(data => console.log("Admin error response " + data));
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.httpClient.delete(this.apiUrl + "/" + id + "/delete", {headers:headers}).pipe(
      catchError(error => {
          return of(error.message)
        })
      ).subscribe(data => {
        console.log("Admin deleting product " + data)
        if(data.message !== null && data.status === false){
          this.openDialog(data.message)
        }else {
          this.ngOnInit()
        }
      });
  }

  openDialog(message: string){
    console.log("error message", message)
    const dialogRef = this.dialog.open(DialogComponent, {data:message});
  }

  editProduct(id: any) {
    this.router.navigate([`/admin/products/edit/${id}`]);
  }
}
