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
  NbTabsetModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { HomeComponent } from './home/home.component';
import { FsIconComponent, GridComponent } from './grid/grid.component';
import { FeaturesComponent } from './features/features.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HideElementsDirective } from './features/directives/hide-elements.directive';
import { HideTabletDirective } from './features/directives/hide-tablet.directive';
import { TrimPipe } from './features/pipes/trim.pipe';

const nbModules = [
  NbSidebarModule,
  NbLayoutModule,
  NbActionsModule,
  NbMenuModule,
  NbUserModule,
  NbCardModule,
  NbIconModule,
  NbTabsetModule,
  NbTreeGridModule,
];

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    GridComponent,
    FeaturesComponent,
    PrivacyComponent,
    HideElementsDirective,
    HideTabletDirective,
    TrimPipe,
    FsIconComponent,
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
