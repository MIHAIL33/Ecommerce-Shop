import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@wmwstudio/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

  order!: Order;
  orderStatuses: any[] = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messegaService: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this._getOrder()
    this._mapOrderStatus()
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe(order => {
          this.order = order
          this.selectedStatus = order.status
        })
      }
    }) 
  }

  onStatusChange(event: any) {
    this.orderService.updateOrder({ status: event.value }, this.order.id!).subscribe(order => {
      this.order.status = order.status
      this.messegaService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order is updated!'
      })
    }, 
    () => {
      this.messegaService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      })
    })
  }

  onCancel() {
    this.location.back()
  }

}
