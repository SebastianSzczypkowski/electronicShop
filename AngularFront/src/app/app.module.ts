import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrdouctDetailsComponent } from './components/prdouct-details/prdouct-details.component';
import { PrdouctCategoryMenuComponent } from './components/prdouct-category-menu/prdouct-category-menu.component';
import { PrdouctListComponent } from './components/prdouct-list/prdouct-list.component';
import { SearchComponent } from './components/search/search.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PrdouctDetailsComponent,
    PrdouctCategoryMenuComponent,
    PrdouctListComponent,
    SearchComponent,
    OrderHistoryComponent,
    CheckoutComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
