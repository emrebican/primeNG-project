import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from 'primeng/api';
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
  basket: BasketInterface[] = [];
  SUB!: Subscription;

  constructor(
    private apiService: ApiService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.apiService.fetchBasket().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });

    this.basket = this.basketService.getBasket();

    this.SUB = this.basketService.basketChanged.subscribe({
      next: (basket: BasketInterface[]) => {
        this.basket = basket;
      },
      error: (err) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.SUB.unsubscribe();
  }
}
