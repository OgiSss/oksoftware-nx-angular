import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NbSidebarModule } from '@nebular/theme';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, NbSidebarModule],
})
export class AdminModule {}
