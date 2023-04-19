import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-selector',
  templateUrl: './common-selector.component.html',
  styleUrls: ['./common-selector.component.scss']
})
export class CommonSelectorComponent {
    @Input() mainLabel: string = '';
    @Input() options: any = [];
    @Input() selectedVal: any;
    /**
     * exampleObj = {
     *   val: '',
     *   id: ''
     * }
     */
    @Output() optionSelectedValue: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}


    optionSelected(selVal: any) {
      this.optionSelectedValue.emit(selVal.target.value);
    }
}
