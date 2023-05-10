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

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  onAddBasket(product: ProductInterface) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 1500);

    this.apiService.addToBasket(product).subscribe({
      next: () => console.log('Product is added to Basket'),
      error: (err) => console.log(err)
    });

    // toast
    onShowToast(
      this.messageService,
      'success',
      'Add to Basket',
      `${product.title.toUpperCase()} is added to your Basket`,
      'pi-shopping-bag'
    );
  }
}
