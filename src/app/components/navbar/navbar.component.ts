import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items!: MenuItem[];

  isLoggedIn$!: Observable<boolean>;
  isAnonymous$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      {
          label:'Inicio',
          icon:'pi pi-fw pi-home',
          routerLink: '/'
      },
      {
          label:'Agregar libro',
          icon:'pi pi-fw pi-plus-circle',
          routerLink: '/addbook'
      }
  ];

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAnonymous$ = this.authService.isAnonymous;
  }

  onLogout() {
    this.authService.SignOut();
  }

}
