import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { AddDetalleComponent } from './components/add-book/add-detalle/add-detalle.component';
import { AddCategoriaComponent } from './components/add-book/add-categoria/add-categoria.component';
import { AddAdjuntarComponent } from './components/add-book/add-adjuntar/add-adjuntar.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'detalle-libro', component: DetalleLibroComponent, canActivate: [AuthGuard] },
  {
    path: 'addbook',
    component: AddBookComponent,
    canActivate: [AuthGuard],
    children: [{
        path: '',
        redirectTo: 'add-detalle',
        pathMatch: 'full'
      },
      {
        path: 'add-detalle',
        component: AddDetalleComponent
      },
      {
        path: 'add-categoria',
        component: AddCategoriaComponent
      },
      {
        path: 'add-adjuntar',
        component: AddAdjuntarComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
