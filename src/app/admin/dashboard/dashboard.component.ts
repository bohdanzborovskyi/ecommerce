import {Component} from '@angular/core';
import {AdminProductsComponent} from "../admin-products/admin-products.component";
import {AdminCustomersComponent} from "../admin-customers/admin-customers.component";
import {AdminOrdersComponent} from "../admin-orders/admin-orders.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminProductsComponent,
    AdminCustomersComponent,
    AdminOrdersComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
