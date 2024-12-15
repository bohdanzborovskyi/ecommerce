import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {BASE_API_URL} from "../../config/api";
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "../../state/order/order.service";

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit{

  private apiUrl = BASE_API_URL + "/api/admin/"
  protected orders: any = [];
  totalPages: number[] = []
  private pageNumber = 0;
  orderStatus: string[] = [
    "PLACED", "PENDING", "DELIVERED", "SHIPPED", "CONFIRMED", "CANCELED"
  ]

  constructor(private httpClient: HttpClient, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.retrieveOrders(this.pageNumber)
  }

  createPages(totalPages: number) {
    for(let i=0; i<totalPages; i++) {
      this.totalPages[i] = i+1;
    }
  }

  retrieveOrders(pageNumber: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    let params = new HttpParams()
      .set("pageSize",10)
      .set("pageNumber", pageNumber);
    this.httpClient.get(this.apiUrl + "orders/", {headers:headers,params:params}).pipe(
      map(data => {
        this.orders = data;
        this.createPages(this.orders.totalPages)
        console.log("admin orders data: " , data);
      }),
      catchError( error => {
        return of(error.message)
      })
    ).subscribe(data =>{
      console.log("Admin  response " + data)
    });
  }

  updateOrder(orderId: any, orderStatus: string[]) {
    if(orderStatus.includes("DELIVERED")){
      console.log("status", orderStatus + " " + orderId)
      this.orderService.deliverOrder(orderId);
    }
    if(orderStatus.includes("SHIPPED")){
      console.log("status", orderStatus + " " + orderId)
      this.orderService.shipOrder(orderId);
    }
    if(orderStatus.includes("CONFIRMED")){
      console.log("status", orderStatus + " " + orderId)
      this.orderService.confirmOrder(orderId);
    }
    if(orderStatus.includes("CANCELED")){
      console.log("status", orderStatus + " " + orderId)
      this.orderService.cancelOrder(orderId);
    }
  }
}
