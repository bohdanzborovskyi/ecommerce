import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MdbRippleModule,
    MatButton,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  openNavbarContent(menu: string) {

  }

  navigateTo(path: string) {

  }
}
