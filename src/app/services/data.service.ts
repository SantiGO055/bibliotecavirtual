import { Injectable } from '@angular/core';
import { Libro } from '../model/libro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  libro!: Libro;
  public form!: FormGroup
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({     // {5}
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      categoria: ['',Validators.required],
      file: ['', Validators.required],
      altaCategoria: ['']
    });
  }

  isFieldInvalid(field: string) { // {6}

    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched)
    );
  }


}
