import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserResponseModel } from '../auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url: string = environment.url;

  constructor(private httpClient: HttpClient) {}

  public register(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const data = JSON.stringify({
      email,
      password,
      username: email,
    });
    const registerUrl = `${this.url}/auth/local/register`;
    return this.httpClient.post(registerUrl, data, { headers });
  }

  public login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const data = JSON.stringify({
      identifier: email,
      password,
    });
    const registerUrl = `${this.url}/api/auth/local`;
    return this.httpClient.post<UserResponseModel>(registerUrl, data, {
      headers,
    });
  }

  public forgotPassword(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const forgotPasswordUrl = `${this.url}/api/auth/forgot-password`;
    return this.httpClient.post<UserResponseModel>(
      forgotPasswordUrl,
      { email },
      {
        headers,
      }
    );
  }

  public resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const forgotPasswordUrl = `${this.url}/api/auth/reset-password`;

    const data = JSON.stringify({
      code,
      password,
      passwordConfirmation,
    });
    return this.httpClient.post<UserResponseModel>(forgotPasswordUrl, data, {
      headers,
    });
  }
}
