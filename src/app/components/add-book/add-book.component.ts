import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Libro, Libros } from 'src/app/model/libro';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

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

  items!: MenuItem[];

  ngOnInit(): void {
    
    this.items = [
      {
      label: 'Datos del libro',
      routerLink: 'add-detalle'
      },
      {
          label: 'Categoria',
          routerLink: 'add-categoria'
      },
      {
          label: 'Adjunta el libro',
          routerLink: 'add-adjuntar'
      }
    ];
    
    this.uploaded = false;
    // this.form = this.fb.group({     // {5}
    //   titulo: ['', Validators.required],
    //   autor: ['', Validators.required],
    //   editorial: ['', Validators.required],
    //   categoria: ['',Validators.required],
    //   file: ['', Validators.required],
    //   altaCategoria: ['']
    // });
    
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

  

 
  reciboFormFile(event: any) {
    // console.log(event)
    this.form.controls['file'].setValue(event)
    console.log(this.form.get("file"))


  }
}
