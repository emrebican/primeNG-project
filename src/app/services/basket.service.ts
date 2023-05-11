import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BasketInterface } from '../models/basket.model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  basketChanged = new BehaviorSubject<BasketInterface[]>([]);
  basket: BasketInterface[] = [];

  constructor() {}

  saveBasket(basket: BasketInterface[]) {
    this.basket = basket;
    this.basketChanged.next(this.basket.slice());
  }

  getBasket() {
    return this.basket.slice();
  }
}
