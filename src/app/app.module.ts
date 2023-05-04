import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';

import { AppRoutingModule } from './app-routing.module';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { CardComponent } from './components/card/card.component';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [AppComponent, LayoutsComponent, HomeComponent, CardComponent, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // primeNG Modules
    ButtonModule,
    MenubarModule,
    CardModule,
    DividerModule,
    DynamicDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
