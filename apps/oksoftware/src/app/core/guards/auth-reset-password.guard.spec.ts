import { TestBed } from '@angular/core/testing';

import { AuthResetPasswordGuard } from './auth-reset-password.guard';

describe('AuthResetPasswordGuard', () => {
  let guard: AuthResetPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthResetPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
