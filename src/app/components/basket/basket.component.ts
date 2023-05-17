import { OnInit, Component, OnDestroy } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ApiService } from 'src/app/services/api.service';
import { BasketService } from 'src/app/services/basket.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

import { onShowToast } from 'src/app/tools/toastShow';
import { BasketInterface } from 'src/app/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class BasketComponent implements OnInit, OnDestroy {
  basketProducts: BasketInterface[] = [];
  SUB!: Subscription;
  totalPrice: number = 0;

  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];
  sortOrder!: number;
  sortField!: string;
  ref!: DynamicDialogRef;

  constructor(
    private ms: MessageService,
    private cs: ConfirmationService,
    public ds: DialogService,
    private apiService: ApiService,
    private basketService: BasketService,
    private router: Router
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
        this.totalPrice = basket
          .map((res) => res.price)
          .reduce((acc, curr) => acc + Number(curr), 0);
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

  /* Confirm payment and reset Basket */
  onConfirm() {
    const ids = this.basketProducts.map((item) => item.id);

    if (this.totalPrice !== 0) {
      this.cs.confirm({
        message: `Do you confirm <span class="font-bold text-lg">$${this.totalPrice}</span> payment?`,
        icon: 'pi pi-paypal',
        accept: () => {
          this.showModal();

          this.apiService.resetBasket(ids);
          this.apiService.fetchBasket().subscribe();

          setTimeout(() => {
            this.ref.close();
            this.router.navigate(['/home']);
          }, 4000);
        },

        reject: () => {
          this.ms.add({
            severity: 'warn',
            summary: 'Payment Cancelled',
            detail: 'You have cancelled the Payment'
          });
        }
      });
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

  private showModal() {
    this.ref = this.ds.open(ConfirmationComponent, {
      header: '',
      width: '50vw'
    });
  }
}
