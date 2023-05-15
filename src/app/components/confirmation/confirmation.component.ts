import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  }
}
