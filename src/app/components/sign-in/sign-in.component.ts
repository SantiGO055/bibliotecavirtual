import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form!: FormGroup;                    // {1}
  private formSubmitAttempt?: boolean; // {2}

  isLoading$!: Observable<boolean>;


  private usuarioDirecto: User = { email: "mrarodrigue@hotmail.com", password: "maria08" }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.authService.isLoading;
    this.form = this.fb.group({     // {5}
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}

    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form?.valid) {
      this.authService.login(this.form.value).then((a) => {
        console.log("qeu devuelve login")
        console.log(a)
      });
    }
    else {

    }
    this.formSubmitAttempt = true;             // {8}
  }
  loginDirecto() {
    this.authService.login(this.usuarioDirecto);
  }
  loginAnonimo() {
    this.authService.loginAnonymous();
  }
}
