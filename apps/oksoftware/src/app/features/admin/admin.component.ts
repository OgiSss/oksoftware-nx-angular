import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AppState, authLogout } from '../../core/core.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'oksoftware-nx-angular-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(authLogout());
  }
}
