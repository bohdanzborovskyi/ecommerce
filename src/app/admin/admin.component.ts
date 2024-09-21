import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_API_URL} from "../config/api";
import {catchError, map, of} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  private apiUrl = BASE_API_URL + "/api/admin"

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      .set("Content-Type", "application/json");
    this.httpClient.get(this.apiUrl + "/orders/", {headers:headers}).pipe(
      map(data => {
        console.log("admin data: " , data);
      }),
      catchError( error => {
      return of(error.message)
    })
    ).subscribe(data => console.log("Admin response " + data));
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
