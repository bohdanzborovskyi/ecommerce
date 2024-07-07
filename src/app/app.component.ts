import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductsComponent} from "./products/products.component";
import {select, Store} from "@ngrx/store";
import {UserService} from "./state/user/user.service";
import {AppState} from "./models/appState";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCarouselModule, HomeComponent, NavbarComponent, FooterComponent, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecommerce';

  constructor(private userService: UserService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("jwt")){
      this.userService.getUserProfile()
    }
    this.store.pipe(select((store)=>store.auth)).subscribe((user)=>{
      console.log("user", user);
      this.userService.getUserProfile()
    })
  }
}
