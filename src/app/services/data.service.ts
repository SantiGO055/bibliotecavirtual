import { Injectable } from '@angular/core';
import { Libro, Libros } from '../model/libro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerService } from './spinner.service';
import { FirebaseService } from './firebase.service';

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
  constructor(public fb: FormBuilder, private spinner: SpinnerService, private db: FirebaseService) {
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

  async cargarLibro() {

    try {

      let titulo = this.form.get("titulo")?.value
      let autor = this.form.get("autor")?.value
      let editorial = this.form.get("editorial")?.value
      let categoria = this.form.get('categoria')?.value
      let altaCategoria = this.form.get("altaCategoria")?.value
      
      if(altaCategoria){
        categoria = altaCategoria;
        this.db.altaCategoria(altaCategoria)
      }

      if (this.form?.valid) {
        


        // this.storage.uploadToAWS(this.fileName, this.file).then((a) => {
        //   console.log(a)
        // }).finally(() => {
        //   let libro: Libro = { titulo, autor, editorial, urlArchivo: this.url, nombreArchivo: this.fileName }
        //   this.db.altaLibro(libro)
        // });

        this.spinner.showSpinner();
        if(this.fileName){
          if(this.file){
            this.db.tareaCloudStorage(this.fileName, this.file).then((url) => {
              this.url = this.db.url;
            }).catch((e) => console.log(e))
            .finally(() => {
              let libro: Libro = { titulo, autor, editorial, urlArchivo: this.url, nombreArchivo: this.fileName, categoria}
              let libroAlta: Libros = {categoria, libro}
              console.log(libroAlta)
              this.db.altaLibro(libroAlta)
              this.form.get("titulo")?.setValue('')
              this.form.get("autor")?.setValue('')
              this.form.get("editorial")?.setValue('')
              this.form.get('categoria')?.setValue('')
              this.form.get('file')?.setValue('')
              this.form.get('altaCategoria')?.setValue('')
              this.form.get('checkCategoria')?.setValue('')
              
            });
          }

        }

      }
      else {

      }



    } catch (error) {

    }

  }



}
