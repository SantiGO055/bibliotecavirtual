import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Libro, Libros } from 'src/app/model/libro';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  listadoLibros!: Libros[];
  listadoCategorias!: String[];
  _avatarUrl: SafeResourceUrl | undefined
  libroSeleccionado!: Libro;

  constructor(private firebase: FirebaseService, private readonly dom: DomSanitizer, private router: Router, private dataService: DataService) {

  }

  ngOnInit() {
    this.firebase.getLibros().subscribe((listadoLibros) => {
      this.listadoLibros = listadoLibros;
      console.log(this.listadoLibros)

    })
    this.firebase.getCategorias().subscribe((listadoCategorias) => {
      this.listadoCategorias = listadoCategorias;
      console.log(this.listadoCategorias)
    })
    
  }
  
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 1 };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  async downloadImage(path: string) {
    try {
      const { data } = await this.firebase.downloadImage(path)
      if (data instanceof Blob) {
        this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data))
        console.log(this._avatarUrl)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message)
      }
    }
  }

  verLibro(libro: Libro) {
    this.libroSeleccionado = libro;
    this.router.navigate(['/detalle-libro'])
  }


  ngOnDestroy() {
    this.dataService.libro = this.libroSeleccionado;
  }

}
