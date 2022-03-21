import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const modules = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [CommonModule, ...modules],
})
export class SharedModule {}
