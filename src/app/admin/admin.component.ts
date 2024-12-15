import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../config/api";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatDivider
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  private apiUrl = BASE_API_URL + "/api/admin"

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {

  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
