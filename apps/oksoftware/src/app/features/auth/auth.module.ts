import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NbIconModule } from '@nebular/theme';
import { AuthService } from '../../core/auth/services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { NbSidebarModule, NbLayoutModule } from '@nebular/theme';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    AuthRoutingModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
