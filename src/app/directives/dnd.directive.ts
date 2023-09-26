import { Directive, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {



  @HostBinding('class.fileover')
  fileOver!: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }
  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();


    // const files = (evt.target as HTMLInputElement).files[0];
    const files = evt.dataTransfer.files;
    console.log(files)
    this.fileOver = false;

    if (files.length > 0 && files != undefined) {
      console.log(`You dropped ${files.length} files.`);
      console.log(files)
      this.fileDropped.emit(files);
    }
  }

}
