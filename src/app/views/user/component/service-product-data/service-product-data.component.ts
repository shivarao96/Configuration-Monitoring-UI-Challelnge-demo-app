import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastHandlerService, ToastStatus } from '@app/services/toastHandler/toast-handler.service';
import { UserHandlerService } from '@app/services/userHandler/user-handler.service';

@Component({
  selector: 'app-service-product-data',
  templateUrl: './service-product-data.component.html',
  styleUrls: ['./service-product-data.component.scss']
})
export class ServiceProductDataComponent implements OnInit, OnChanges {
  @Input() serviceList: any;
  @Input() productList: any;
  @Input() product: any;
  @Input() service: any;
  @Input() groupData: any;
  isEdit: boolean = false;
  selectedProductId: any = null;
  selectedServiceId: any = null;
  isAnyValChanged: boolean = false;
  @Output() readonly reloadMetaInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userHandlerService: UserHandlerService, private toastHandler: ToastHandlerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.serviceList && this.serviceList.length) {
      this.selectedServiceId = this.serviceList.map((e: any) => e.id).indexOf(this.service.service_id);
    }

    if (this.productList && this.productList.length) {
      this.selectedProductId = this.productList.map((e: any) => e.id).indexOf(this.product.product_id);
    }
  }

  ngOnInit(): void {
  }

  buttonAction() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  selectedServiceIndex(event: any) {
    this.selectedServiceId = event;
    if (!this.isAnyValChanged) {
      this.isAnyValChanged = true;
    }
  }

  selectedProductIndex(event: any) {
    this.selectedProductId = event;
    if (!this.isAnyValChanged) {
      this.isAnyValChanged = true;
    }
  }

  saveAction() {
    if (this.isAnyValChanged) {
      console.log(this.serviceList)
      console.log(this.selectedServiceId);
      this.userHandlerService.updateServiceMetaInfo({
        groupId: this.groupData.group_id,
        prevServiceId: this.service.service_id,
        prevProductId: this.product.product_id,
        serviceId: this.serviceList[this.selectedServiceId].id,
        productId: this.productList[this.selectedProductId].id
      }).subscribe((res) => {
        this.service = this.serviceList[this.selectedServiceId].info;
        this.product = this.productList[this.selectedProductId].info;
        this.isAnyValChanged = false;
        this.toastHandler.showToast(ToastStatus.SUCCESS, "Changes Saved !");
      }, err => {
        this.toastHandler.showToast(ToastStatus.ERROR, "Failed to save changes !");
      });
    }
  }

  deleteElem() {
    this.reloadMetaInfo.emit({
      action: true, meta: {
        productId: this.product.product_id,
        serviceId: this.service.service_id,
        groupId: this.groupData.group_id
      }
    });
  }

}
