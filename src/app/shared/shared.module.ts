import { FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedRoutingModule } from './shared-routing.module';
import { ListClassComponent } from './list-class/list-class.component';
import { ShortListRowComponent } from './short-list-row/short-list-row.component';
import { NameSelectComponent } from './name-select/name-select.component';
import { MultySelectComponent } from './multy-select/multy-select.component';
import { MultySelectLineComponent } from './multy-select-line/multy-select-line.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    UnauthorizedComponent,
    ListClassComponent,
    ShortListRowComponent,
    NameSelectComponent,
    MultySelectComponent,
    MultySelectLineComponent ],
  exports: [
    CommonModule,
    NgbModule,
    UnauthorizedComponent,
    ListClassComponent,
    NameSelectComponent,
    MultySelectComponent
  ]
})
export class SharedModule { }
