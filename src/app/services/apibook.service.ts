import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApibookService {

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { }

  url: string = "https://www.googleapis.com/books/v1/volumes?q="

  obtenerTapaDelLibro(nombre: string) {
    return this.http.get(this.url + nombre)
  }

}
