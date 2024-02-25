import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss']
})
export class AddCategoriaComponent {
  form!: FormGroup;
  subscriberGetCategorias!: Subscription;
  agregarCategoriaFL: boolean = false;
  categorias!: String[];
  
  constructor(private router: Router, public dataService: DataService,private db: FirebaseService){
    
  }
  ngOnInit(): void{
    this.form = this.dataService.form;

    console.log(this.form)

    this.subscriberGetCategorias = this.db.getCategorias().subscribe(cat=> {
      cat.push("Agregar categoria");
      this.categorias = cat;
      console.log(this.categorias)
    })
  }
  ngOnDestroy() {
    if (this.subscriberGetCategorias) {
      this.subscriberGetCategorias.unsubscribe();
      }
  }

  nextPage(){

    this.router.navigate(['/addbook/add-adjuntar']);

      return;

  }
}
