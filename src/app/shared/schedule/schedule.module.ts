import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ScheduleColumnComponent } from './schedule-column/schedule-column.component';
import { ScheduleCellComponent } from './schedule-cell/schedule-cell.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScheduleCellComponent,
    ScheduleColumnComponent,
    ScheduleTableComponent
  ],
  exports: [ ScheduleTableComponent ]
})
export class ScheduleModule { }
