import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Libro } from 'src/app/model/libro';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  listadoLibros!: Libro[];
  _avatarUrl: SafeResourceUrl | undefined
  libroSeleccionado!: Libro;

  constructor(private firebase: FirebaseService, private readonly dom: DomSanitizer, private router: Router, private dataService: DataService) {

  }

  ngOnInit() {
    this.firebase.getLibros().subscribe((listadoLibros) => {
      this.listadoLibros = listadoLibros;
      console.log(this.listadoLibros)


      // this.downloadImage(this.listadoLibros[3].nombreArchivo)
    })
  }
  slides = [
    { img: "https://placehold.jp/150x250.png" },
    { img: "https://placehold.jp/3d4070/ffffff/150x250.png" },
    { img: "https://placehold.jp/150x250.png" },
    { img: "https://placehold.jp/3d4070/ffffff/150x250.png" },
    { img: "https://placehold.jp/150x250.png" },
    { img: "https://placehold.jp/3d4070/ffffff/150x250.png" },

  ];
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
