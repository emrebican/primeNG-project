import { Component, Input } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';

import { ProductInterface } from 'src/app/models/product.model';
import { onShowToast } from 'src/app/tools/toastShow';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [MessageService]
})
export class CardComponent {
  @Input('productItem') product!: ProductInterface;
  loading: boolean = false;

  constructor(private apiService: ApiService, private ms: MessageService) {}

  onAddBasket(product: ProductInterface) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 800);

    this.apiService.storeBasket(product).subscribe({
      next: () => {
        this.apiService.fetchBasket().subscribe();

        // success toast
        onShowToast(
          this.ms,
          'success',
          'Add to Basket',
          `${product.title.toUpperCase()} is added to your Basket`,
          'pi-shopping-bag'
        );
      },
      error: (err) => {
        // error toast
        if (err.status === 500) {
          onShowToast(
            this.ms,
            'error',
            'ERROR',
            'You already have this Product in your Basket!',
            'pi-times-circle'
          );
        }
      }
    });
  }
}
