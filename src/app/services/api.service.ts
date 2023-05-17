import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

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

  removeFromProducts(id: number) {
    return this.http.delete<any>(this.api + `products/${id}`);
  }

  // BASKET
  fetchBasket() {
    return this.http
      .get<BasketInterface[]>(this.api + 'basket')
      .pipe(tap((basket) => this.basketService.saveBasket(basket)));
  }

  storeBasket(product: ProductInterface) {
    return this.http.post<ProductInterface>(this.api + 'basket', product);
  }

  deleteFromBasket(id: number) {
    return this.http.delete<any>(this.api + `basket/${id}`);
  }

  resetBasket(deleteIds: any) {
    deleteIds.map((id: number) => {
      return this.http.delete<any>(this.api + `basket/${id}`).subscribe();
    });
  }
}
