import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NbIconModule } from '@nebular/theme';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    HttpClientModule,
    AuthRoutingModule,
    NbIconModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
