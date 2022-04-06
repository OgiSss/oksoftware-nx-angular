import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { FeaturesComponent } from './features/features.component';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'grid', component: GridComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'privacy', component: PrivacyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
