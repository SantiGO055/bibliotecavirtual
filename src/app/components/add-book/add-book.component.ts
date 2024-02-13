import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Libro, Libros } from 'src/app/model/libro';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  fileName!: string;
  file!: any;
  agregarCategoriaFL: boolean = false;
  
  constructor(private readonly storage: FirebaseService, private readonly dom: DomSanitizer, private fb: FormBuilder,
    private db: FirebaseService, private spinner: SpinnerService) { }

  set fileUrl(url: string | null) {
    if (url) {
      this.downloadFile(url)
    }
  }
  categorias!: String[];

  ngOnInit(): void {
    this.uploaded = false;
    this.form = this.fb.group({     // {5}
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      categoria: ['',Validators.required],
      file: ['', Validators.required],
      altaCategoria: ['']
    });
    this.db.getCategorias().subscribe(cat=> {
      cat.push("Agregar categoria");
      this.categorias = cat;
    })
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
  isInvalidFile(field: string) { // {6}

    return (
      (!this.form.get(field)?.valid)
    );
  }

  mostrarInputAgregarCategoria(){
    console.log(this.form.get("categoria")?.value)
    this.agregarCategoriaFL = this.form.get("categoria")?.value == "Agregar categoria" ? true : false;
  }
  agregarCategoria(){
    console.log(this.form.get("altaCategoria")?.value)
    this.db.altaCategoria(this.form.get("altaCategoria")?.value)
    this.agregarCategoriaFL = false;
    this.form.get("categoria")?.setValue({categoria: this.form.get("altaCategoria")?.value})
    
    //this.form.setValue({categoria : this.form.get("altaCategoria")?.value})

  }
  onSubmit() {
    if (this.form?.valid) {

    }
    else {

    }
    this.formSubmitAttempt = true;             // {8}
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

  async cargarLibro() {

    try {

      let titulo = this.form.get("titulo")?.value
      let autor = this.form.get("autor")?.value
      let editorial = this.form.get("editorial")?.value
      let categoria = this.form.get("categoria")?.value



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
            this.storage.tareaCloudStorage(this.fileName, this.file).then((url) => {
              this.url = this.storage.url;
            }).catch((e) => console.log(e))
            .finally(() => {
              let libro: Libro = { titulo, autor, editorial, urlArchivo: this.url, nombreArchivo: this.fileName, categoria}
              let libroAlta: Libros = {categoria, libro}
              console.log(libroAlta)
              this.db.altaLibro(libroAlta)
              
            });
          }

        }

      }
      else {

      }
      this.formSubmitAttempt = true;



    } catch (error) {

    }

  }
  reciboFormFile(event: any) {
    // console.log(event)
    this.form.controls['file'].setValue(event)
    console.log(this.form.get("file"))


  }
}
