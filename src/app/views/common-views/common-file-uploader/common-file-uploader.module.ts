import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { FormsModule } from '@angular/forms';
import { FileDragAndDropDirective } from '@app/directives/file-drag-and-drop.directive';
import { CommonFileUploaderComponent } from './common-file-uploader.component';

@NgModule({
    declarations: [
        CommonFileUploaderComponent,
        FileDragAndDropDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        CommonFileUploaderComponent,
        FileDragAndDropDirective
    ]
})
export class CommonFileUploaderModule {}