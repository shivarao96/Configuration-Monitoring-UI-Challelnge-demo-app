import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { LoggerConsoleComponent } from './logger-console.component';
import { CommonFileUploaderModule } from '../common-views/common-file-uploader/common-file-uploader.module';
import { CommonOverlayModule } from '../common-views/common-overlay/common-overlay.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoggerConsoleComponent
    ],
    imports: [
        CommonModule,
        CommonOverlayModule,
        CommonFileUploaderModule,
        FormsModule
    ],
    exports: [
        LoggerConsoleComponent
    ]
})
export class LoggerConsoleModule {}