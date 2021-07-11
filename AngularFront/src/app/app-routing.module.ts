import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { PrdouctDetailsComponent } from './components/product-details/prdouct-details.component';
import { PrdouctListComponent } from './components/product-list/prdouct-list.component';

const routes: Routes = [
  {path:'order-history',component:OrderHistoryComponent},
  {path: 'checkout',component:CheckoutComponent},
  {path: 'cart-details',component:CartDetailsComponent},
  {path: 'product-details/:id',component:PrdouctDetailsComponent},
  {path: 'search/:keyword',component:PrdouctListComponent},
  {path: 'category/:id/:name',component:PrdouctListComponent},
  {path: 'category',component:PrdouctListComponent},
  {path: 'products',component:PrdouctListComponent},
  {path: '',redirectTo: '/products',pathMatch:'full'},
  {path: '**',redirectTo: '/products',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
