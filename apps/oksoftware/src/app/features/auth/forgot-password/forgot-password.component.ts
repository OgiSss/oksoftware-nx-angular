import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authForgotPassword } from '../../../core/auth/auth.actions';
import { AuthState } from '../../../core/auth/auth.models';
import { authLogin } from '../../../core/core.module';

@Component({
  selector: 'oksoftware-nx-angular-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  private sub = new Subscription();
  submitted = false;

  constructor(
    private toastrService: NbToastrService,
    private store: Store<AuthState>,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.sub.add(
      this.form.valueChanges.subscribe(() => {
        this.submitted = false;
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastrService.show(
        'Something went wrong. Check your password',
        'Validation'
      );

      return;
    }

    this.forgotPassword();
  }

  private forgotPassword() {
    const { email } = this.form.value;

    this.store.dispatch(authForgotPassword({ email }));
  }
}
