import { OnInit, Component, OnDestroy } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { BasketService } from 'src/app/services/basket.service';

import { onShowToast } from 'src/app/tools/toastShow';
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
  price: number = 0;

  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];
  sortOrder!: number;
  sortField!: string;

  constructor(
    private ms: MessageService,
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

        // price
        this.price = basket
          .map((res) => res.price)
          .reduce((acc, curr) => acc + curr, 0);
      },
      error: (err) => console.log(err)
    });
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

  onDeleteFromBasket(id: number) {
    this.apiService.deleteFromBasket(id).subscribe(() => {
      // success toast
      onShowToast(
        this.ms,
        'warn',
        'Deleted',
        `Product is deleted from your Basket`,
        'pi-exclamation-triangle'
      );

      // fetch Basket after deleting
      this.apiService.fetchBasket().subscribe();
    });
  }
}
