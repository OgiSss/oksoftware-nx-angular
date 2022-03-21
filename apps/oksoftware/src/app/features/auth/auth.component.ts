import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'oksoftware-nx-angular-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  constructor(private readonly formBuilder: FormBuilder, private router: Router) {}

  public submit() {
    this.router.navigateByUrl('admin');
    console.log(this.form.value);
  }
}
