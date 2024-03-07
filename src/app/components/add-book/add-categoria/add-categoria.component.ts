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
  subscriberGetCategorias!: Subscription;
  
  categorias!: String[];
  
  
  constructor(private router: Router, public dataService: DataService,private db: FirebaseService){
    
  }
  ngOnInit(): void{

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
    
  }

  nextPage(){
    let str: string = 'hello';
    if(this.dataService.form.get('altaCategoria')?.value)
      this.dataService.form.get('altaCategoria')?.setValue(this.dataService.form.get('altaCategoria')?.value[0].toUpperCase() + this.dataService.form.get('altaCategoria')?.value.slice(1));
    
    if((this.dataService.form.get('categoria')?.value || this.dataService.form.get('altaCategoria')?.value) && this.dataService.form.get('categoria')?.value != 'Seleccione categoria'){
      console.log(this.dataService.form.get('altaCategoria')?.value)
      console.log(this.dataService.form.get('categoria')?.value)
      this.router.navigate(['/addbook/add-adjuntar']);

      return;
    }
  }
  previousPage(){
    this.router.navigate(['/addbook/add-detalle']);

      return;
  }

  changeCategoriaCheckbox(e: any){
    console.log(e)
    this.dataService.form.get('categoria')?.setValue('')
    if(!e[0]){
      this.dataService.form.get('altaCategoria')?.setValue('')
      
    }
    
    
  }
  changeDropdown(){
    if(this.dataService.form.get('categoria')?.value != 'Seleccione categoria')
    {
      this.dataService.form.get('checkCategoria')?.setValue('')
      this.dataService.form.get('altaCategoria')?.setValue('')
    }
    
    

  }
}
