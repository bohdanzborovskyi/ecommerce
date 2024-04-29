import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCarouselModule, HomeComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
