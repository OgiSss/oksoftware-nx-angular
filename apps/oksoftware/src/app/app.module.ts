import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CoreModule } from './core/core.module';

const nebularModules = [
  NbThemeModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot(),
  NbMenuModule.forRoot(),
  NbEvaIconsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...nebularModules,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
