import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { FileDragAndDropDirective } from 'src/app/directives/file-drag-and-drop.directive';

@Component({
    selector: 'app-common-file-uploader',
    templateUrl: './common-file-uploader.component.html',
    styleUrls: ['./common-file-uploader.component.scss'],
})
export class CommonFileUploaderComponent {

    fileName: string|undefined = '';
    file: File | null = null;

    @Output() uploadedFile: EventEmitter<FormData> = new EventEmitter<FormData>();

    constructor(private http: HttpClient) { }

    onFileDropped(event: any) {
        if(event[0]) {
            this.file = event[0];
            this.fileName = this.file?.name;
        }
    }

    onFileSelected(event: any) {
        const target = event.target;
        if (target && target.files) {
            this.file = target.files[0];
            this.fileName = this.file?.name;
        }
    }

    uploadFile() {
        if (this.file) {
            const formData = new FormData();
            formData.append("uploadedFile", this.file);
            this.uploadedFile.emit(formData);
        }
    }

    removeFile() {
        this.file = null;
        this.fileName = undefined;
    }

}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}
