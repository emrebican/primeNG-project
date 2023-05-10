import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { ProductInterface } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  productsChanged = new Subject<ProductInterface[]>();
  products: ProductInterface[] = [];
  showToast = new BehaviorSubject<boolean>(false);

  constructor() {}

  saveProducts(products: ProductInterface[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  addProduct(product: ProductInterface) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());

    this.showToast.next(true);

    setTimeout(() => {
      this.showToast.next(false);
    }, 200);
  }
}
