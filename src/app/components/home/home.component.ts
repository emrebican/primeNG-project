import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { productInterface } from 'src/app/models/product.model';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeComponent {
  products: productInterface[] = [
    {
      id: 1,
      title: 'Product 1',
      subTitle: 'Product 1 Subtitle',
      imageURL: 'https://primefaces.org/cdn/primeng/images/usercard.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
    },
    {
      id: 2,
      title: 'Product 2',
      subTitle: 'Product 2 Subtitle',
      imageURL: 'https://primefaces.org/cdn/primeng/images/usercard.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
    },
    {
      id: 3,
      title: 'Product 3',
      subTitle: 'Product 3 Subtitle',
      imageURL: 'https://primefaces.org/cdn/primeng/images/usercard.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
    },
    {
      id: 4,
      title: 'Product 4',
      subTitle: 'Product 4 Subtitle',
      imageURL: 'https://primefaces.org/cdn/primeng/images/usercard.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
    }
  ];
  ref!: DynamicDialogRef;

  constructor(public ds: DialogService) {}

  showModal() {
    this.ref = this.ds.open(FormComponent, {
      header: 'Add a Product',
      width: '50vw'
    });
  }
}
