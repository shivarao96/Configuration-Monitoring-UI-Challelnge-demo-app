import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-grouped-data',
  templateUrl: './grouped-data.component.html',
  styleUrls: ['./grouped-data.component.scss']
})
export class GroupedDataComponent implements OnChanges {
  @Input() groupData : any;
  @Input() groupList: any;
  @Input() productList: any;
  @Input() serviceList: any;

  @Output() readonly openGroupOverlay: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly reloadMetaInfo: EventEmitter<any> = new EventEmitter<any>();
  
  
  ngOnChanges(changes: SimpleChanges): void {
  //  console.log(this.productList)
  }

  openOverlay() {
    this.openGroupOverlay.emit({action: 'add_new_service_product_data', groupId: this.groupData.group_id})
  }

  captureReloadMetaInfo(event: any) {
    this.reloadMetaInfo.emit(event);
  }
}
