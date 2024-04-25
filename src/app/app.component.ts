import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCarouselModule, HomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
