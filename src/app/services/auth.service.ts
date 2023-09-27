import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loading = new BehaviorSubject<boolean>(false);
  private anonymous = new BehaviorSubject<boolean>(false);

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private firebase: FirebaseService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  login(user: User): Promise<void> {
    this.loading.next(true);

    if (user.email !== '' && user.password !== '') {



      return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((result) => {
        //TODO implement login in firebase
        this.loggedIn.next(true);
        this.anonymous.next(false);
        console.log(result);
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.SetUserData(result.user);
        this.loading.next(false);
        this.router.navigate(['/']);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire(errorCode, errorMessage, "warning")

        console.log(error);
      })

    }
    else return new Promise<void>((resolve, reject) => {
      return false;
    })
  }
  loginAnonymous() {
    this.loading.next(true);
    this.afAuth.signInAnonymously().then((result) => {
      this.loggedIn.next(true);
      this.anonymous.next(true)
      console.log(result.user?.isAnonymous)
      localStorage.setItem('user', JSON.stringify(result.user));
      this.loading.next(false);
      this.router.navigate(['/']);
    })
  }

  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }

  // AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       console.log('You have been successfully logged in!');
  //       console.log(result.user)
  //       this.SetUserData(result.user);
  //       this.afAuth.authState.subscribe((user) => {
  //         if (user) {
  //           this.router.navigate(['main']);
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  SignOut() {
    this.afAuth.signOut();
    localStorage.removeItem('user');

    this.loggedIn.next(false);
    this.anonymous.next(false)

    this.router.navigate(['sign-in'])
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   // return user !== null && user.emailVerified !== false ? true : false; //TODO cambiar cuando se implemente el login
  //   return true;
  // }
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  get isAnonymous() {
    return this.anonymous.asObservable(); // {2}
  }
  get isLoading() {
    return this.loading.asObservable(); // {2}
  }



  SetUserData(user: any) {
    this.firebase.SetUserData(user)
  }
}
