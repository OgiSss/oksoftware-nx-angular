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
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [CommonModule, ...modules],
})
export class SharedModule {}
