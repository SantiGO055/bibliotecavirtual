import { Injectable } from '@angular/core';
import { Libro } from '../model/libro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  _imageUrl: SafeResourceUrl | undefined
  uploaded = false
  upload: String = ''
  url: string = ''
  fileName!: string;
  file!: any;


  libro!: Libro;
  public form!: FormGroup
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({     // {5}
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      categoria: ['',Validators.required],
      file: ['', Validators.required],
      altaCategoria: [''],
      checkCategoria: ['']
    });
  }

  isFieldInvalid(field: string) { // {6}

    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched) || (this.form.get(field)?.value == 'Seleccione categoria')
    );
  }
  prepararSubida(files: any) {
    try {
      // console.log(files)

      if (!files || files.length === 0) {
        throw new Error('Debe seleccionar un archivo PDF para subir.')
      }



      const file = files[0]
      const fileName = files[0].name
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      this.fileName = fileName;
      this.file = file;

      if (fileExt != "pdf") {
        this.fileName = "";
        this.file = undefined;
        Swal.fire("Error", "El archivo debe ser con formato PDF", "error")
      }

    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("que", error.message, "warning")
      }
    } finally {
    }
  }

  reciboFormFile(event: any) {
    // console.log(event)
    this.form.controls['file'].setValue(event)


  }



}
