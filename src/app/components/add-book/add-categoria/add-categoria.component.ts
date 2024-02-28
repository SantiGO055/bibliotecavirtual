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
  nuevaCategoria: boolean = false;
  categorias!: String[];
  
  
  constructor(private router: Router, public dataService: DataService,private db: FirebaseService){
    
  }
  ngOnInit(): void{
    this.nuevaCategoria = false;
    this.form = this.dataService.form;
    this.form.get('altaCategoria')?.setValue('')
    console.log(this.form)

    this.subscriberGetCategorias = this.db.getCategorias().subscribe(cat=> {
      cat.unshift("Seleccione categoria");
      this.categorias = cat;
      console.log(this.categorias)
    })
  }
  ngOnDestroy() {
    if (this.subscriberGetCategorias) {
      this.subscriberGetCategorias.unsubscribe();
      }
    this.nuevaCategoria = false;
    this.form.get('categoriaCheck')?.setValue('')
    
  }

  nextPage(){
    if(this.nuevaCategoria){
      this.form.get('categoria')?.setValue(this.form.get('altaCategoria')?.value)
      
      console.log(this.form.get('categoria')?.value)
    }
    else{
      console.log(this.form.get('categoria')?.value)
    }
    this.dataService.form.get('categoria')?.setValue(this.form.get('categoria')?.value)

    console.log(this.dataService.form.status)
    // if (this.form.get('categoria')?.value && this.form.get('autor')?.value && this.form.get('editorial')?.value) {
    //   this.dataService.form.get('titulo')?.setValue(this.form.get("titulo")?.value)
    //   this.dataService.form.get('autor')?.setValue(this.form.get("autor")?.value)
    //   this.dataService.form.get('editorial')?.setValue(this.form.get("editorial")?.value)
    // }
    this.router.navigate(['/addbook/add-adjuntar']);

      return;

  }
  previousPage(){
    this.router.navigate(['/addbook/add-detalle']);

      return;
  }

  changeCategoria(e: any){
    console.log(e)
    if(this.nuevaCategoria){
      this.form.get('categoria')?.setValue('')
    }
    this.nuevaCategoria = !this.nuevaCategoria
  }
  changeDropdown(){
    if(this.form.get('categoria')?.value == 'Seleccione categoria')
      console.log(this.nuevaCategoria)
    

  }
}
