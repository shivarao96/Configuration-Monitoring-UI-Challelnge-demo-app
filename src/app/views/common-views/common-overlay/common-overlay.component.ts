import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-common-overlay',
  templateUrl: './common-overlay.component.html',
  styleUrls: ['./common-overlay.component.scss']
})
export class CommonOverlayComponent {
  @Output() readonly closeOverlay = new EventEmitter<boolean>();
  constructor() { }

  closeOverlayClicked(): void {
    this.closeOverlay.emit(true);
  }
}
