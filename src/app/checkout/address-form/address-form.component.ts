import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {AddressCardComponent} from "../address-card/address-card.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatDivider,
    NgIf,
    AddressCardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  addresses = [1,1,1,1,1,];
  addressForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    mobile: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) {
  }

  createOrder(address: any) {
    console.log("address", address);
  }

  submit() {
    const formValue = this.addressForm.value
    console.log("submit", formValue);
  }
}
