import {Component, Input} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {MatDialogContent} from "@angular/material/dialog";
import {AuthService} from "../../state/auth/auth.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    NgIf,
    MatButton,
    MatDialogContent
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  @Input() changeTemplate : any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService) {

  }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['',[
      Validators.required,
      Validators.email]],
    password: ['',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,64})')]],
  })

  submitForm = () => {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      console.log("login form valid", this.loginForm.value);
    }
  }
}
