import { RouterModule } from '@angular/router';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    UsermenuComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UsermenuComponent
  ]
})
export class StaticComponentsModule { }
