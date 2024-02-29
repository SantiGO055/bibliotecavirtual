import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.component.html',
  styleUrls: ['./add-detalle.component.scss']
})
export class AddDetalleComponent {
  titulo: any;
  autor:any;
  editorial:any;

  submitted: boolean = false;
  private formSubmitAttempt?: boolean; // {2}
  

  constructor(private router: Router, public dataService: DataService){
    
  }
  
  isFieldInvalid(field: string) { // {6}

    return (
      (!this.dataService.form.get(field)?.valid && this.dataService.form.get(field)?.touched) ||
      (this.dataService.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  nextPage() {

    
    if (this.dataService.form.get('titulo')?.value && this.dataService.form.get('autor')?.value && this.dataService.form.get('editorial')?.value) {
      // this.dataService.form.get('titulo')?.setValue(this.form.get("titulo")?.value)
      // this.dataService.form.get('autor')?.setValue(this.form.get("autor")?.value)
      // this.dataService.form.get('editorial')?.setValue(this.form.get("editorial")?.value)
      
        this.router.navigate(['/addbook/add-categoria']);

        return;
    }

    this.submitted = true;
}


}
