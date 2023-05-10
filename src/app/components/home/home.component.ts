import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

// Services
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';
import { MessageService } from 'primeng/api';

// Components
import { FormComponent } from '../form/form.component';

// interfaces
import { ProductInterface } from 'src/app/models/product.model';

import { onShowToast } from 'src/app/tools/toastShow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, MessageService]
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductInterface[] = [];
  ref!: DynamicDialogRef;
  SUB!: Subscription;

  constructor(
    public ds: DialogService,
    private productsService: ProductsService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.productsService.showToast.subscribe((res) => {
      if (res === true) {
        // toast
        onShowToast(
          this.messageService,
          'info',
          'Product added to List',
          'Your Product is added to List',
          'pi-check'
        );
      }
    });
  }

  ngOnInit(): void {
    this.apiService.fetchProducts().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });

    this.products = this.productsService.getProducts();

    this.SUB = this.productsService.productsChanged.subscribe(
      (products: ProductInterface[]) => {
        this.products = products;

        // close Modal
        this.ref.close();
      }
    );
  }

  ngOnDestroy(): void {
    this.SUB.unsubscribe();
  }

  showModal() {
    this.ref = this.ds.open(FormComponent, {
      header: 'Add a Product',
      width: '50vw'
    });
  }
}
