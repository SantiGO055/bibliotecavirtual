import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss']
})
export class AddCategoriaComponent {
  form!: FormGroup;
  
  constructor(private router: Router, public dataService: DataService){
    
  }
  ngOnInit(): void{
    this.form = this.dataService.form;

    console.log(this.form)
  }

  nextPage(){

    this.router.navigate(['/addbook/add-adjuntar']);

      return;

  }
}
