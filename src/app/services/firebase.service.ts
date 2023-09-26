import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Image } from '../model/image';
import { Observable, Subject, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public loading: boolean = false;
  uploadProgress: Observable<number> = new Observable;
  private uploadProgressSubject = new Subject<any>();
  url: string = '';
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {

    // var prueba = db.object('a')
    // db.list('a').push({ 'asd': 'asdasdasdadsa' })
    // prueba.set({ 'asd123': 'aaaaaaa¿aaaa' }) // crea o updatea en caso de que exista
    // prueba.valueChanges().subscribe(val => console.log(val))
  }

  //Tarea para subir archivo
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
}
