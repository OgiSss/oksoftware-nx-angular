import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { authResetPassword } from '../../../core/auth/auth.actions';
import { AuthState } from '../../../core/auth/auth.models';
import { ConfirmPasswordValidator } from '../../../helpers/validators/confirm-password-validator';

@Component({
  selector: 'oksoftware-nx-angular-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  form: FormGroup;
  private sub = new Subscription();
  submitted = false;
  showPassword = false;
  code = '';

  constructor(
    private toastrService: NbToastrService,
    private store: Store<AuthState>,
    private route: ActivatedRoute,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(
      {
        passwordConfirmation: ['', [Validators.required]],
        password: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'passwordConfirmation'),
      }
    );

    this.sub.add(
      this.form.valueChanges.subscribe(() => {
        this.submitted = false;
      })
    );

    this.sub.add(
      this.route.queryParams
        .pipe(filter((params) => params['code']))
        .subscribe((params) => {
          this.code = params['code'];
        })
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
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

    if (!this.code) {
      this.toastrService.show(
        "Something went wrong. Code doesn't exist create new link",
        'Validation'
      );

      return;
    }

    this.resetPassword();
  }

  private resetPassword() {
    const { password, passwordConfirmation } = this.form.value;

    const code = this.code;

    this.store.dispatch(
      authResetPassword({ code, password, passwordConfirmation })
    );
  }
}
