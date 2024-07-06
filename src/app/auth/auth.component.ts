import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf,
    SigninComponent,
    SignupComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoggedIn = true;

  changeTemplate = () => {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
