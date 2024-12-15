import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../state/product/product.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../models/appState";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    AsyncPipe,
    MatIcon,
    MatMiniFabButton,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  productId: any;
  product: any;

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
    discountPercent: ['', Validators.required],
    sizes: this.formBuilder.array([])
  })

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private store: Store<AppState>,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
    this.productService.findProductsById(this.productId)
    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
      this.product = product.product
      this.product.sizes.forEach((size: { name: any; quantity: any; })=>{
        const sizeForm = this.formBuilder.group({
          name:[size.name, Validators.required],
          quantity:[size.quantity, Validators.required]
        });
        this.sizes.push(sizeForm);
        console.log('add item to size', size)
      })
    })
  }


  editProduct() {
    let product = this.productForm.value;
    console.log(product)
    this.productService.editProduct(product, this.productId);
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
