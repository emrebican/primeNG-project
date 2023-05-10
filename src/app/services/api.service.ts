import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product.model';
import { tap } from 'rxjs';

import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  api: string = 'http://localhost:4000/';

  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  fetchProducts() {
    return this.http
      .get<ProductInterface[]>(this.api + 'products')
      .pipe(tap((products) => this.productService.saveProducts(products)));
  }

  storeProducts(product: ProductInterface) {
    const products = this.productService.getProducts();
    console.log('PR: ', products);

    return this.http.post<ProductInterface>(this.api + 'products', product);
  }

  addToBasket(product: ProductInterface) {
    return this.http.post<ProductInterface>(this.api + 'basket', product);
  }
}
