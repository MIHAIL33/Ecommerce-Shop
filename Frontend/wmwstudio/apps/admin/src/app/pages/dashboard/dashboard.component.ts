import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@wmwstudio/orders';
import { ProductsService } from '@wmwstudio/products';
import { UsersService } from '@wmwstudio/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics: number[] = []

  endsubs$: Subject<any> = new Subject();

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
    ]).pipe(takeUntil(this.endsubs$)).subscribe((value) => {
      this.statistics = value
    })
  }

  ngOnDestroy(): void {
    this.endsubs$.next()
    this.endsubs$.complete()
  }

}
