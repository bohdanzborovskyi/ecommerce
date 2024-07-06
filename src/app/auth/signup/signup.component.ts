import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {AuthService} from "../../state/auth/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @Input() changeTemplate: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService) {

  }

  loginForm: FormGroup = this.formBuilder.group({
    firstName: ['',
      Validators.required],
    lastName: ['',
      Validators.required],
    email: ['', [
      Validators.required,
      Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,64})')]],
  })

  submitForm = () => {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value);
      console.log("login form valid", this.loginForm.value);
    }
  }

}
