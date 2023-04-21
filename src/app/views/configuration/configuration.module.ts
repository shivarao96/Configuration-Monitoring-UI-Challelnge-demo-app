import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SystemPropertyHandlerComponent } from './component/system-property-handler/system-property-handler.component';
import { FormsModule } from '@angular/forms';
import { CommonFileUploaderModule } from '../common-views/common-file-uploader/common-file-uploader.module';
import { CommonTooltipDirective } from '@app/directives/common-tooltip.directive';

@NgModule({
    declarations: [
        ConfigurationComponent,
        SystemPropertyHandlerComponent,
        CommonTooltipDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ConfigurationRoutingModule,
        CommonFileUploaderModule
    ],
    exports: [
        CommonTooltipDirective
    ]
})
export class ConfigurationModule {}