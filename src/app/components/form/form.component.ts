import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [null, [Validators.required]],
      subTitle: [null, Validators.required],
      content: [null, Validators.required],
      imageURL: [null, Validators.required]
    });
  }

  onSubmit() {
    const product = { id: new Date().getTime(), ...this.productForm.value };
    this.productsService.addProduct(product);

    this.apiService.storeProducts(product).subscribe({
      next: (res) => {
        this.apiService.fetchProducts();

        console.log('FORM: ', res);
      },
      error: (err) => console.log(err)
    });
  }
}
