import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbAlertModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { IpadResponsiveDirective } from './directives/ipad-responsive.directive';

const modules = [
  NbButtonModule,
  NbAlertModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbCheckboxModule,
];

@NgModule({
  declarations: [IpadResponsiveDirective],
  imports: [CommonModule, ...modules],
  exports: [CommonModule, ...modules, IpadResponsiveDirective],
})
export class SharedModule {}
