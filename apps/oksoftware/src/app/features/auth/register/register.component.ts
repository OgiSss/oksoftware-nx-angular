import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'oksoftware-nx-angular-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  private sub = new Subscription();

  constructor(
    private readonly toastrService: NbToastrService,
    readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.sub.add(
      this.registerForm.valueChanges.subscribe(() => {
        this.submitted = false;
      })
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getInputType() {
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
    if (this.registerForm.invalid) {
      this.toastrService.show(
        'Something went wrong. Check your password or email',
        'Validation'
      );

      return;
    }

    this.register();
  }

  register() {
    const { email, password } = this.registerForm.value;

    this.authService.register(email, password).subscribe((result: any) => {
      console.log(result);
    });
  }
}
