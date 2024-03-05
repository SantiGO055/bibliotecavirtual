import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { MainComponent } from './components/main/main.component';
import { DndDirective } from './directives/dnd.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBookComponent } from './components/add-book/add-book.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button'
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { AddDetalleComponent } from './components/add-book/add-detalle/add-detalle.component';
import { AddCategoriaComponent } from './components/add-book/add-categoria/add-categoria.component';
import { AddAdjuntarComponent } from './components/add-book/add-adjuntar/add-adjuntar.component';

import { FormsModule } from '@angular/forms'; // <== add the imports!
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

 

@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent,
    MainComponent,
    DndDirective,
    NavbarComponent,
    AddBookComponent,
    SignInComponent,
    DetalleLibroComponent,
    AddDetalleComponent,
    AddCategoriaComponent,
    AddAdjuntarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    RouterModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    CarouselModule,
    ButtonModule,
    SlickCarouselModule,
    HttpClientModule,
    PdfViewerModule,
    MatSelectModule,
    NgxSpinnerModule,
    InputTextModule,
    CardModule,
    DividerModule,
    ProgressBarModule,
    StepsModule,
    FormsModule,
    DropdownModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

