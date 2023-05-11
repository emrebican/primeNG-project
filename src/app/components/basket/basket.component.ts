import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService, SelectItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { BasketService } from 'src/app/services/basket.service';

import { BasketInterface } from 'src/app/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [MessageService]
})
export class BasketComponent implements OnInit, OnDestroy {
  basketProducts: BasketInterface[] = [];
  SUB!: Subscription;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  constructor(
    private apiService: ApiService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.apiService.fetchBasket().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });

    this.basketProducts = this.basketService.getBasket();

    this.SUB = this.basketService.basketChanged.subscribe({
      next: (basket: BasketInterface[]) => {
        this.basketProducts = basket;
      },
      error: (err) => console.log(err)
    });

    // Sort
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  ngOnDestroy(): void {
    this.SUB.unsubscribe();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
