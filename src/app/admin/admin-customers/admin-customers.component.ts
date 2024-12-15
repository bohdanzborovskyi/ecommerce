import {Component} from '@angular/core';
import {BASE_API_URL} from "../../config/api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-customers',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent {

  private apiUrl = BASE_API_URL + "/api/admin/users"
  protected customers: any = [];
  totalPages: number[] = []
  pageNumber = 0;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.retrieveCustomers(this.pageNumber)
  }

  createPages(totalPages: number) {
    for(let i=0; i<totalPages; i++) {
      this.totalPages[i] = i+1;
    }
  }

  retrieveCustomers(pageNumber: number){
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    let params = new HttpParams().set("pageSize",10).set("pageNumber", pageNumber);
    this.httpClient.get(this.apiUrl + "/all", {headers:headers, params:params}).pipe(
      map(data => {
        this.customers = data;
        this.createPages(this.customers.totalPages)
        console.log("admin users data: " , data);
      }),
      catchError( error => {
        return of(error.message)
      })
    ).subscribe(data => console.log("Admin users response " + data));
  }
}
