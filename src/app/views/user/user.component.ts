import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastHandlerService, ToastStatus } from '@app/services/toastHandler/toast-handler.service';
import { UserHandlerService } from 'src/app/services/userHandler/user-handler.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UserHandlerService
  ]
})
export class UserComponent implements OnInit {

  userData: any = [];
  products: any = [];
  services: any = [];
  groups: any = [];

  currentAction: string = 'add_new_group_data'

  groupIndex: number = 0;
  serviceIndex: number = 0;
  productIndex: number = 0;

  filteredGroupIndex: number = 0;
  filteredServiceIndex: number = 0;
  filteredProductIndex: number = 0;

  showOverlay: boolean = false;

  showFilterPopup: boolean = false;
  selectedGroupForOverlay: string | null = null;

  isValChanged: boolean = false;

  selectedFilterKeyVal: any = {
    key: null,
    val: null
  }

  infoSet = new Map();

  currentPageNumber: number = 1;

  count: number = 0;

  @ViewChild('filtertogglebtn') filtertogglebtn: ElementRef | undefined;
  @ViewChild('filterpopup') filterPopup: ElementRef | undefined;

  constructor(
    private userHandlerService: UserHandlerService,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastHandler: ToastHandlerService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.filtertogglebtn?.nativeElement && e.target !== this.filterPopup?.nativeElement && !this.filterPopup?.nativeElement.contains(e.target)) {
        this.showFilterPopup = false;
      }
    });

    this.infoSet.set('group', []);
    this.infoSet.set('service', []);
    this.infoSet.set('product', []);
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllProducts();
    this.getAllServices();

    const queriedFilter = this.activatedRoute.snapshot.queryParamMap.get('filter');
    let filter = {};
    const queriedPage = this.activatedRoute.snapshot.queryParamMap.get('page');
    if (queriedFilter) {
      const [key, val] = queriedFilter.split(':');
      if (key === 'group') {
        filter = {
          groupId: val
        }
      }
      if (key === 'service') {
        filter = {
          serviceId: val
        }
      }
      if (key === 'product') {
        filter = {
          productId: val
        }
      }
    }
    let offset = queriedPage ? +queriedPage - 1 : 0;

    this.getAllMetaInfo(filter, offset);
  }

  getAllMetaInfo(filter: any = {}, offset = 0, limit = 10) {
    const body: any = {
      limit,
      offset
    }
    if (filter && Object.keys(filter).length !== 0) {
      body['filter'] = filter;
    }
    this.currentPageNumber = offset + 1;
    this.userHandlerService.getAllMetaInfo(body).subscribe((res: any) => {

      const data = res.body.data;
      this.userData = data;
      this.count = res.body.count;

      if (filter && filter.groupId) {
        this.selectedFilterKeyVal.key = 'group';
        this.selectedFilterKeyVal.val = filter.groupId;
      }

      if (filter && filter.serviceId) {
        this.selectedFilterKeyVal.key = 'service';
        this.selectedFilterKeyVal.val = filter.serviceId;
      }

      if (filter && filter.productId) {
        this.selectedFilterKeyVal.key = 'product';
        this.selectedFilterKeyVal.val = filter.productId;
      }

      let queryParams: Params = { page: offset + 1 };

      if (filter && Object.keys(filter).length !== 0) {
        queryParams['filter'] = `${this.selectedFilterKeyVal.key}:${this.selectedFilterKeyVal.val}`;
      } else {
        queryParams['filter'] = null;
        this.selectedFilterKeyVal.key = null;
        this.selectedFilterKeyVal.val = null;
      }
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
    }, err => {
      if (filter && Object.keys(filter).length !== 0) {
        this.selectedFilterKeyVal.key = null;
        this.selectedFilterKeyVal.val = null;
      }
      this.userData = [];
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get the user config !");
    });
  }

  getAllServices() {
    this.userHandlerService.getAllServices().subscribe((res) => {
      this.services = res.body.data.map((a: any, index: number) => {
        return {
          val: a.service_name,
          id: a.service_id,
          index,
          info: { ...a }
        }
      })
      this.infoSet.set('service', this.services);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get the services info, please try again later !");
    });
  }

  getAllGroups() {
    this.userHandlerService.getAllGroups().subscribe((res) => {
      this.groups = res.body.data.map((a: any, index: number) => {
        return {
          val: a.group_name,
          id: a.group_id,
          index,
          info: { ...a }
        }
      })
      this.infoSet.set("group", this.groups);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get the group info, please try again later !");
    })
  }

  getAllProducts() {
    this.userHandlerService.getAllProducts().subscribe((res) => {
      this.products = res.body.data.map((a: any, index: number) => {
        return {
          val: a.product_name,
          id: a.product_id,
          index,
          info: { ...a }
        }
      });
      this.infoSet.set('product', this.products);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get the products info, please try again later !");
    });
  }

  selectedServiceIndex(event: any, isFilterVal = false) {
    if (isFilterVal) {
      this.filteredServiceIndex = event;
    } else {
      this.serviceIndex = event;
      if (!this.isValChanged) {
        this.isValChanged = true;
      }
    }
  }

  selectedGroupIndex(event: any, isFilterVal = false) {
    if (isFilterVal) {
      this.filteredGroupIndex = event;
    } else {
      this.groupIndex = event;
      if (!this.isValChanged) {
        this.isValChanged = true;
      }
    }
  }

  selectedProductIndex(event: any, isFilterVal = false) {
    if (isFilterVal) {
      this.filteredProductIndex = event;
    } else {
      this.productIndex = event;
      if (!this.isValChanged) {
        this.isValChanged = true;
      }
    }
  }

  toggleFilter() {
    this.showFilterPopup = !this.showFilterPopup;
  }

  uploadUserConfig(event: FormData) {
    this.userHandlerService.uploadUserConfig(event).subscribe((res) => {
      this.getAllMetaInfo()
      this.toastHandler.showToast(ToastStatus.SUCCESS, "Upload config successfully !");
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to upload, please try again later !");
    })
  }

  openAddPrdSrvOverlay(event: any) {
    this.currentAction = event.action;
    this.showOverlay = true;
    this.selectedGroupForOverlay = event.groupId;
  }

  save() {
    if (this.isValChanged) {
      this.userHandlerService.addServiceMetaInfo({
        groupId: this.selectedGroupForOverlay ? this.selectedGroupForOverlay : this.groups[this.groupIndex].id,
        serviceId: this.services[this.serviceIndex].id,
        productId: this.products[this.productIndex].id
      }).subscribe((res) => {
        this.getAllMetaInfo();
        this.isValChanged = false;
        this.toastHandler.showToast(ToastStatus.SUCCESS, "Changes Saved !");
      },
        (err: any) => { }, () => {
          this.showOverlay = false;
          this.selectedGroupForOverlay = null;
          this.toastHandler.showToast(ToastStatus.ERROR, "Failed to save changes !");
        })
    }
  }

  addNewGroupData() {
    this.showOverlay = true;
    this.currentAction = 'add_new_group_data'
  }

  captureReloadMetaInfo(event: any) {
    this.userHandlerService.deleteServiceMetaInfo({
      groupId: event.meta.groupId,
      serviceId: event.meta.serviceId,
      productId: event.meta.productId
    }).subscribe((res) => {
      this.getAllMetaInfo();
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get meta data !");
    });
  }

  applyGroupFilter() {
    this.getAllMetaInfo({
      groupId: this.groups[this.filteredGroupIndex].id
    });
  }

  applyServiceFilter() {
    this.getAllMetaInfo({
      serviceId: this.services[this.filteredServiceIndex].id
    });
  }

  applyProductFilter() {
    this.getAllMetaInfo({
      productId: this.products[this.filteredProductIndex].id
    });
  }

  getFilterVal() {
    return (this.infoSet.get(this.selectedFilterKeyVal.key).filter((res: any) => res.id === this.selectedFilterKeyVal.val))[0].val
  }

  clearAllFilter() {
    this.getAllMetaInfo();
  }

  changePage(pageInfo: any) {
    // if(!pageInfo.isInitial) {
    // }
    let filter = {};
    if (this.selectedFilterKeyVal.key && this.selectedFilterKeyVal.val) {
      if (this.selectedFilterKeyVal.key === 'group') {
        filter = {
          groupId: this.selectedFilterKeyVal.val
        }
      }
      if (this.selectedFilterKeyVal.key === 'service') {
        filter = {
          serviceId: this.selectedFilterKeyVal.val
        }
      }
      if (this.selectedFilterKeyVal.key === 'product') {
        filter = {
          productId: this.selectedFilterKeyVal.val
        }
      }
    }
    let offset = pageInfo - 1;

    this.getAllMetaInfo(filter, offset);
  }

  reuploadConfig() {

    this.userHandlerService.removeAllServiceMetaInfo().subscribe((res) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, "you are good to upload new config !");
      this.userData = [];
      this.products = [];
      this.services = [];
      this.groups = [];

      this.currentAction = 'add_new_group_data'

      this.groupIndex = 0;
      this.serviceIndex = 0;
      this.productIndex = 0;

      this.filteredGroupIndex = 0;
      this.filteredServiceIndex = 0;
      this.filteredProductIndex = 0;

      this.showOverlay = false;

      this.showFilterPopup = false;
      this.selectedGroupForOverlay = null;

      this.isValChanged = false;

      this.selectedFilterKeyVal = {
        key: null,
        val: null
      }

      this.currentPageNumber = 1;

      this.count = 0;
      this.infoSet.set('group', []);
      this.infoSet.set('service', []);
      this.infoSet.set('product', []);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to reset user config !");
    })

  }

}
