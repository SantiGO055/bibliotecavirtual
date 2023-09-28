import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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




}
