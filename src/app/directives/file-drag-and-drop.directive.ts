import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragAndDropDirective {

   @Output() private filesChangeEmiter : EventEmitter<File> = new EventEmitter();
   @HostBinding('style.background') private background = 'white';
 
   constructor() { }
 
   @HostListener('dragover', ['$event']) public onDragOver(evt: any){
     evt.preventDefault();
     evt.stopPropagation();
     this.background = '#F6F7FB';
   }
 
   @HostListener('dragleave', ['$event']) public onDragLeave(evt: any){
     evt.preventDefault();
     evt.stopPropagation();
     this.background = 'white';
   }
 
   @HostListener('drop', ['$event']) public onDrop(evt: any){
     evt.preventDefault();
     evt.stopPropagation();
     this.background = 'white';
     let files = evt.dataTransfer.files;
     let valid_files : File = files;
     this.filesChangeEmiter.emit(valid_files);
   }

}
