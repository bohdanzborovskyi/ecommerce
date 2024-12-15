import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {CartComponent} from "./cart/cart.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentComponent} from "./payment/payment.component";
import {PaymentSuccessComponent} from "./payment-success/payment-success.component";
import {OrderComponent} from "./order/order.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {AdminProductsComponent} from "./admin/admin-products/admin-products.component";
import {AdminOrdersComponent} from "./admin/admin-orders/admin-orders.component";
import {AdminCustomersComponent} from "./admin/admin-customers/admin-customers.component";
import {CreateProductComponent} from "./admin/create-product/create-product.component";
import {AdminGuard} from "./guards/AdminGuard";
import {UserGuard} from "./guards/UserGuard";
import {EditProductComponent} from "./admin/edit-product/edit-product.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], canActivateChild:[AdminGuard],  children:[
      {path: '', component: DashboardComponent},
      {path: 'products', component: AdminProductsComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'customers', component: AdminCustomersComponent},
      {path: 'products/create', component: CreateProductComponent},
      {path: 'products/edit/:id', component: EditProductComponent}
    ]},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent, canActivate:[UserGuard]},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout/payment/:id', component: PaymentComponent},
  {path: ':levelOne/:levelTwo/:levelThree', component: ProductsComponent},
  {path: 'payment-success', component: PaymentSuccessComponent},
  {path: 'account/orders', component: OrderComponent},
  {path: 'order/:id', component: OrderDetailsComponent}
];
