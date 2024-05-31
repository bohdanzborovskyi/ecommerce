import {Component, ElementRef, HostListener} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NavContentComponent} from "./nav-content/nav-content.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MdbRippleModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    NgIf,
    NavContentComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentSection: any;
  isNavbarContentOpen: boolean = false;

  constructor(private router:Router) {
  }

  openNavbarContent(section: string) {
    this.isNavbarContentOpen = true
    this.currentSection = section
  }

  closeNavBarContent() {
    const modalContent = document.querySelector(".modal-container");
    if (modalContent) {
      this.isNavbarContentOpen = false
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
