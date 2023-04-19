import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { CommonOverlayComponent } from './common-overlay.component';

@NgModule({
    declarations: [
        CommonOverlayComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonOverlayComponent
    ]
})
export class CommonOverlayModule {}