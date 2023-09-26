import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

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
  login(user: User) {
    console.log(user)

    if (user.email !== '' && user.password !== '') { // {3}
      this.userData = { email: user.email, emailVerified: true }
      this.loggedIn.next(true);
      //TODO implement login in firebase
      console.log(this.userData)
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.router.navigate(['/']);
    }
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

    console.log(localStorage.getItem('user'))
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

  SetUserData(user: any) {
    this.firebase.SetUserData(user)
  }
}
