import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-adjuntar',
  templateUrl: './add-adjuntar.component.html',
  styleUrls: ['./add-adjuntar.component.scss']
})
export class AddAdjuntarComponent {

  constructor(private router: Router, public dataService: DataService){

  }

  previousPage(){
    this.router.navigate(['/addbook/add-categoria']);

      return;
  }

  nextPage(){
    if(this.dataService.form.get('categoria')?.value || this.dataService.form.get('altaCategoria')?.value){
      console.log(this.dataService.form.get('altaCategoria')?.value)
      console.log(this.dataService.form.get('categoria')?.value)

      return;
    }
  }

}
