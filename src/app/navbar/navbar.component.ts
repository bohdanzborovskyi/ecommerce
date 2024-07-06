import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NavContentComponent} from "./nav-content/nav-content.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthComponent} from "../auth/auth.component";
import {UserService} from "../state/user/user.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../models/appState";

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
export class NavbarComponent implements OnInit {
  currentSection: any;
  isNavbarContentOpen: boolean = false;
  userProfile: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private store: Store<AppState>) {
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

  openLoginModal() {
    this.dialog.open(AuthComponent, {
      width: "450px",
      disableClose: false
    })
  }

  ngOnInit() {
    if (localStorage.getItem("jwt")) {
      this.userService.getUserProfile();
    }
    this.store.pipe(select(store => store.user)).subscribe(user => {
      this.userProfile = user.userProfile
      console.log("store", this.store);
      if (user.userProfile) {
        this.dialog.closeAll()
        console.log("store", this.store);
      }
    })
  }

  logout() {
    this.userService.logout();
  }
}
