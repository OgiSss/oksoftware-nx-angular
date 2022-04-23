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

const NbModules = [
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
  declarations: [],
  imports: [CommonModule, ...NbModules],
  exports: [CommonModule, ...NbModules],
})
export class SharedModule {}
