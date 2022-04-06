import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbActionsModule,
  NbMenuModule,
  NbUserModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { FeaturesComponent } from './features/features.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { NgxEchartsModule } from 'ngx-echarts';

const nbModules = [
  NbSidebarModule,
  NbLayoutModule,
  NbActionsModule,
  NbMenuModule,
  NbUserModule,
  NbCardModule,
  NbIconModule,
];

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    GridComponent,
    FeaturesComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ...nbModules,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class AdminModule {}
