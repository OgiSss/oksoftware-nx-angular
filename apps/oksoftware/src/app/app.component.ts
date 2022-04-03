import { Component } from '@angular/core';
import { AppState } from './core/core.state';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './core/core.module';
import { tap } from 'rxjs';
@Component({
  selector: 'oksoftware-nx-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}
  isAuth = this.store
    .select(selectIsAuthenticated)
    .pipe(tap((item) => console.log(item)));
}
