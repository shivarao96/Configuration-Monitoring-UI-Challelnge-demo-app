import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { UserRoutingModule } from './user.routing';
import { UserComponent } from './user.component';
import { GroupedDataComponent } from './component/grouped-data/grouped-data.component';
import { ServiceProductDataComponent } from './component/service-product-data/service-product-data.component';
import { CommonSelectorComponent } from '../common-views/common-selector/common-selector.component';
import { FormsModule } from '@angular/forms';
import { CommonOverlayComponent } from '../common-views/common-overlay/common-overlay.component';
import { CommonFileUploaderModule } from '../common-views/common-file-uploader/common-file-uploader.module';
import { CommonOverlayModule } from '../common-views/common-overlay/common-overlay.module';
import { CommonPaginationComponent } from '../common-views/common-pagination/common-pagination.component';

@NgModule({
    declarations :[
        UserComponent,
        GroupedDataComponent,
        ServiceProductDataComponent,
        CommonSelectorComponent,
        CommonPaginationComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        CommonFileUploaderModule,
        FormsModule,
        CommonOverlayModule
    ],
    exports: []
})
export class UserModule {};