import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { ApiService } from '../services/api.service';
import { BasketService } from '../services/basket.service';
import { BasketInterface } from '../models/basket.model';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  items!: MenuItem[];
  basketProducts: BasketInterface[] = [];

  constructor(
    private apiService: ApiService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    // Basket Value
    this.apiService.fetchBasket().subscribe();
    this.basketProducts = this.basketService.getBasket();

    this.basketService.basketChanged.subscribe(
      (res) => (this.basketProducts = res)
    );

    // MenuItem
    this.items = [
      {
        label: 'Basket',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/basket'
      }
    ];
  }
}
