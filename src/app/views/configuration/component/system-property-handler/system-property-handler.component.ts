import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { SystemConfigHandlerService } from '@app/services/systemConfigHandler/system-config-handler.service';
import { ToastHandlerService, ToastStatus } from '@app/services/toastHandler/toast-handler.service';

@Component({
    selector: 'app-system-property-handler',
    templateUrl: './system-property-handler.component.html',
    styleUrls: ['./system-property-handler.component.scss']
})
export class SystemPropertyHandlerComponent {

    @ViewChild('filtertogglebtn') filtertogglebtn: ElementRef | undefined;
    @ViewChild('filterpopup') filterPopup: ElementRef | undefined;
    showFilterPopup: boolean = false;
    propertyCurrentValue: string = '';
    placeholderValue: string = '';
    propertyName: string = '';
    propertyDescription: string = '';
    @Input() set propertyMetaData(val: any) {
        if (val) {
            for (let key in val) {
                if (key === 'description') {
                    this.propertyDescription = val[key];
                } else {
                    this.propertyName = key;
                    this.propertyCurrentValue = this.placeholderValue = val[key];
                }
            }
        }
    }
    @Output() readonly changePropVal: EventEmitter<any> = new EventEmitter<any>()

    editActioninitiated: Boolean = false;
    inputVal: string = '';
    showLoader: boolean = false;

    constructor(
        private systemConfig: SystemConfigHandlerService,
        private toastHandler: ToastHandlerService,
        private renderer: Renderer2,
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target !== this.filtertogglebtn?.nativeElement && e.target !== this.filterPopup?.nativeElement && !this.filterPopup?.nativeElement.contains(e.target)) {
                this.showFilterPopup = false;
            }
        });
    }

    propAction(): void {
        if (this.editActioninitiated) {
            this.showLoader = true;
            this.systemConfig.updateSystemConfig({
                key: this.propertyName,
                value: this.propertyCurrentValue
            }).subscribe(() => {
                this.toastHandler.showToast(ToastStatus.SUCCESS, "Changes Saved !");
            }, err => {
                this.toastHandler.showToast(ToastStatus.ERROR, "Failed to save changes !");
                this.showLoader = false;
            }, () => {
                this.showLoader = false;
                this.editActioninitiated = false;
            });
        } else {
            this.editActioninitiated = !this.editActioninitiated
        }
    }

    cancelEdit() {
        this.editActioninitiated = false;
    }

    toggleFilter() {
        this.showFilterPopup = !this.showFilterPopup;
    }

}
