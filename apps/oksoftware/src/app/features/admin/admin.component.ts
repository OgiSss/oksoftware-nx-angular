import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AppState, authLogout } from '../../core/core.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'oksoftware-nx-angular-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: 'home',
      icon: 'home-outline',
    },
    {
      title: 'Data grid',
      icon: 'book-outline',
      link: 'grid',
    },
    {
      title: 'Angular features',
      icon: { icon: 'bulb-outline', pack: 'eva' },
      link: 'features',
    },
    {
      title: 'RxJs',
      icon: { icon: 'bulb-outline', pack: 'eva' },
      link: 'rxjs',
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private store: Store<AppState>
  ) {}

  toggle() {
    this.sidebarService.toggle(true, 'left');
  }

  logout() {
    this.store.dispatch(authLogout());
  }
}
