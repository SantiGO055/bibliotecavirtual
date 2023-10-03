import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Image } from '../model/image';
import { Observable, Subject, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ApibookService } from './apibook.service';
import { Libro } from '../model/libro';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private supabase!: SupabaseClient

  public loading: boolean = false;
  uploadProgress: Observable<number> = new Observable;
  private uploadProgressSubject = new Subject<any>();
  url: string = '';
  urlImagen: string = '';
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private apiBook: ApibookService,
    private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      global: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
        },
      },
    })

    // var prueba = db.object('a')
    // db.list('a').push({ 'asd': 'asdasdasdadsa' })
    // prueba.set({ 'asd123': 'aaaaaaa¿aaaa' }) // crea o updatea en caso de que exista
    // prueba.valueChanges().subscribe(val => console.log(val))
  }


  //Tarea para subir archivo

  uploadToSupabase(filePath: string, file: File) {

    return this.supabase.storage.from('storage-biblioteca').upload(filePath, file)

  }
  downloadImage(path: string) {
    return this.supabase.storage.from('storage-biblioteca').download(path)
  }

  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref(nombreArchivo);
      const uploadTask = this.storage.upload(nombreArchivo, datos);

      uploadTask.percentageChanges().subscribe((percent) => {
        this.uploadProgressSubject.next(percent)
        // console.log(percent)
      })
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL: any) => {
            this.url = downloadURL;
            resolve(downloadURL);
            // console.log(downloadURL)
          });
        })
      ).subscribe((task) => { }, (error) => { reject(error) });

    })

  }
  uploadProgressObservable() {
    return this.uploadProgressSubject.asObservable();
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {

    return this.storage.ref(nombreArchivo);
  }

  SetUserData(user: any) {
    const userRef = this.db.object(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      password: ""
    };

    return userRef.set(userData)
  }
  altaLibro(libro: Libro) {
    this.apiBook.obtenerTapaDelLibro(libro.titulo).subscribe((resultadoLibro: any) => {
      if (resultadoLibro && resultadoLibro.items && resultadoLibro.items[0].volumeInfo && resultadoLibro.items[0].volumeInfo.imageLinks && resultadoLibro.items[0].volumeInfo.imageLinks.thumbnail) {
        this.urlImagen = resultadoLibro.items[0].volumeInfo.imageLinks.thumbnail

        libro.urlImagen = this.urlImagen

        this.db.object('libros/' + this.db.createPushId()).set(libro).then(() => {
          Swal.fire("", "Se subio el libro correctamente", "success").then(() => {
            this.router.navigate(['/']);
          })
        })
      }
      else {
        this.db.object('libros/' + this.db.createPushId()).set(libro).then(() => {
          Swal.fire("", "Se subio el libro correctamente", "success").then(() => {
            this.router.navigate(['/']);
          })
        })
      }
    })
  }
  getLibros(): Observable<Libro[]> {
    return this.db.list<Libro>("libros").valueChanges()
  }
}
