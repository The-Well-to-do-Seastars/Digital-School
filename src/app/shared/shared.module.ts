import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedRoutingModule } from './shared-routing.module';
import { ListClassComponent } from './list-class/list-class.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule
  ],
  declarations: [ UnauthorizedComponent, ListClassComponent ],
  exports: [
    CommonModule,
    NgbModule,
    UnauthorizedComponent
  ]
})
export class SharedModule { }
