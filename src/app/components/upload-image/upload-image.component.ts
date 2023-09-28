import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
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

  fileName!: string;
  form!: FormGroup;

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() formEvent = new EventEmitter<AbstractControl | null>();

  @Input() uploaded = false;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: ['', Validators.required]
    });

    const file = this.form.get('file');

    file?.valueChanges.pipe().subscribe((val) => {
      console.log(val)

    })

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
    this.form.enable()
    this.fileName = event.target.files[0].name
    this.uploadImage(event.target.files)
    this.formEvent.emit(this.form.get("file"))
  }



}
