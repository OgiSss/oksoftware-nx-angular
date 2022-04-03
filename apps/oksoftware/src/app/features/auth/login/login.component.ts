import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'oksoftware-nx-angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;

  private sub = new Subscription();

  constructor(
    private readonly toastrService: NbToastrService,
    readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.sub.add(
      this.loginForm.valueChanges.subscribe(() => {
        this.submitted = false;
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
    if (this.loginForm.invalid) {
      this.toastrService.show(
        'Something went wrong. Check your password or email',
        'Validation'
      );

      return;
    }

    this.login();
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((result: any) => {
      localStorage.setItem('auth', JSON.stringify(result));
    });
  }
}
