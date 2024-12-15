import {Component} from '@angular/core';
import {AddressCardComponent} from "../../checkout/address-card/address-card.component";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../state/product/product.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    AddressCardComponent,
    FormsModule,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  shoesSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
  clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  productForm: FormGroup = this.formBuilder.group({
    imageUrl: ['', Validators.required],
    brand: ['', Validators.required],
    title: ['', Validators.required],
    color: ['', Validators.required],
    topLevelCategory: ['', Validators.required],
    secondLevelCategory: ['', Validators.required],
    thirdLevelCategory: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    discountedPrice: ['', Validators.required],
    discountedPercentage: ['', Validators.required],
    sizes: this.formBuilder.array([])
  })

  constructor(protected formBuilder: FormBuilder, private productService: ProductService) {
  }

  createProduct() {
    let product = this.productForm.value;
    this.productService.createProduct(product);
    console.log("Added product", product);
  }

  get sizes(){
    return this.productForm.controls["sizes"] as FormArray<FormGroup>;
  }

  addSize() {
    const sizeForm = this.formBuilder.group({
        name:['', Validators.required],
        quantity:['', Validators.required]
    });
    this.sizes.push(sizeForm);
  }

  deleteSize(index: number) {
    this.sizes.removeAt(index);
  }


}
