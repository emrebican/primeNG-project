import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FormComponent } from './components/form/form.component';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { CardComponent } from './components/card/card.component';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { BasketComponent } from './components/basket/basket.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    CardComponent,
    FormComponent,
    BasketComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ** primeNG Modules **
    ButtonModule,
    MenubarModule,
    CardModule,
    DividerModule,
    DynamicDialogModule,
    ToastModule,
    DataViewModule,
    DropdownModule,
    BadgeModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
