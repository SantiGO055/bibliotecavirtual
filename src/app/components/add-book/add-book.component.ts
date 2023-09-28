import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {

  _imageUrl: SafeResourceUrl | undefined
  uploaded = false
  form!: FormGroup;
  private formSubmitAttempt?: boolean;
  upload: String = ''
  url: string = ''
  constructor(private readonly storage: FirebaseService, private readonly dom: DomSanitizer, private fb: FormBuilder) { }

  set fileUrl(url: string | null) {
    if (url) {
      this.downloadFile(url)
    }
  }

  ngOnInit(): void {
    this.uploaded = false;
    this.form = this.fb.group({     // {5}
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required]
    });
  }

  // Titulo, autor, editorial

  async downloadFile(fileName: string) {
    var retorno
    try {
      retorno = this.storage.referenciaCloudStorage(fileName).getDownloadURL()

    } catch (error) {
      if (error instanceof Error) {
        // console.error('Error downloading image: ', error.message)
      }
    }
    finally {
      return retorno
    }

  }
  isFieldInvalid(field: string) { // {6}

    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form?.valid) {

    }
    else {

    }
    this.formSubmitAttempt = true;             // {8}
  }

  async uploadFile(files: any) {


    try {
      // console.log(files)

      if (!files || files.length === 0) {
        throw new Error('Debe seleccionar un archivo PDF para subir.')
      }



      const file = files[0]
      const fileName = files[0].name
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      if (fileExt != "pdf") {
        Swal.fire("Error", "El archivo debe ser con formato PDF", "error")
      }
      else {
        this.uploaded = true
        this.storage.tareaCloudStorage(fileName, file).then(() => {
          this.url = this.storage.url;
        });
      }

    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("", error.message, "warning")
      }
    } finally {



    }
  }
}
