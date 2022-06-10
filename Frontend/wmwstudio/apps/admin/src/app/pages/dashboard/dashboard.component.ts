import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@wmwstudio/orders';
import { ProductsService } from '@wmwstudio/products';
import { UsersService } from '@wmwstudio/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  statistics: number[] = []

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe((value) => {
      this.statistics = value
    })
  }

}
