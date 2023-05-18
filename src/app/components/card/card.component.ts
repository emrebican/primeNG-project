import { Component, Input } from '@angular/core';
import { TooltipOptions } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { ApiService } from 'src/app/services/api.service';
import { ProductInterface } from 'src/app/models/product.model';
import { onShowToast } from 'src/app/tools/toastShow';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CardComponent {
  @Input('productItem') product!: ProductInterface;
  loading: boolean = false;

  // tooltip options
  tooltipOptions: TooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'left',
    tooltipStyleClass: 'text-sm font-italic'
  };

  constructor(
    private apiService: ApiService,
    private ms: MessageService,
    private cs: ConfirmationService
  ) {}

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

  onRemoveProduct(event: any, id: number) {
    this.cs.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({
          severity: 'info',
          summary: 'Removed',
          detail: 'Product removed from Product List'
        });

        setTimeout(() => {
          this.apiService.removeFromProducts(id).subscribe(() => {
            // delete from Basket
            this.apiService.deleteFromBasket(id).subscribe();

            // fetch basket after removing
            this.apiService.fetchBasket().subscribe();

            // fetch products after removing
            this.apiService.fetchProducts().subscribe();
          });
        }, 1200);
      }
    });
  }
}
