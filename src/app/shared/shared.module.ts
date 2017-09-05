import { FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedRoutingModule } from './shared-routing.module';
import { ListClassComponent } from './list-class/list-class.component';
import { ShortListRowComponent } from './short-list-row/short-list-row.component';
import { NameSelectComponent } from './name-select/name-select.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ UnauthorizedComponent, ListClassComponent, ShortListRowComponent, NameSelectComponent ],
  exports: [
    CommonModule,
    NgbModule,
    UnauthorizedComponent,
    ListClassComponent,
    NameSelectComponent
  ]
})
export class SharedModule { }
