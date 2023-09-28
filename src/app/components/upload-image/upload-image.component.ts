import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/model/image';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  @Output() newItemEvent = new EventEmitter<any>();

  @Input() uploaded = false;
  constructor() { }

  ngOnInit(): void {
  }

  async uploadImage(event: any) {
    // console.log(event)
    this.newItemEvent.emit(event);
  }
  dragDrop(event: any) {
    // console.log(event)
    this.uploadImage(event);
  }
  buttonUpload(event: any) {
    this.uploadImage(event.target.files);
  }

}
