import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule
  ],
  declarations: [ HeaderComponent, FooterComponent],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    NgbModule
  ]
})
export class SharedModule { }
