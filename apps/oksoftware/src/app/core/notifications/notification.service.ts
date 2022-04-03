import { Injectable, NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private readonly toaster: NbToastrService,
    private readonly zone: NgZone
  ) {}

  default(message: string) {
    this.toaster.default(message, 'Default', {
      duration: 2000,
    });
  }

  info(message: string) {
    this.toaster.info(message, 'Info', {
      duration: 2000,
    });
  }

  success(message: string) {
    this.toaster.success(message, 'Success', {
      duration: 2000,
    });
  }

  warn(message: string) {
    this.toaster.warning(message, 'Warning', {
      duration: 2500,
    });
  }

  error(message: string) {
    this.toaster.danger(message, 'Error', { duration: 1000 });
  }
}
