import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ProductsService } from './products.service';
import { BasketService } from './basket.service';

import { ProductInterface } from '../models/product.model';
import { BasketInterface } from '../models/basket.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  api: string = 'http://localhost:4000/';

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private basketService: BasketService
  ) {}

  // PRODUCTS
  fetchProducts() {
    return this.http
      .get<ProductInterface[]>(this.api + 'products')
      .pipe(tap((products) => this.productService.saveProducts(products)));
  }

  storeProducts(product: ProductInterface) {
    return this.http.post<ProductInterface>(this.api + 'products', product);
  }

  // BASKET
  fetchBasket() {
    return this.http
      .get<ProductInterface[]>(this.api + 'basket')
      .pipe(tap((basket) => this.basketService.saveBasket(basket)));
  }

  storeBasket(product: ProductInterface) {
    return this.http.post<ProductInterface>(this.api + 'basket', product);
  }

  deleteFromBasket(id: number) {
    return this.http.delete<number>(this.api + `basket/${id}`);
  }

  resetBasket() {
    // return this.http.delete(this.api + 'basket');

    const basket: any = [];
    return this.http.put(this.api + 'basket', basket);
  }
}
