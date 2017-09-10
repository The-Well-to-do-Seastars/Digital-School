import { ShortUserData } from './../../models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dschool-schedule-column',
  templateUrl: './schedule-column.component.html',
  styleUrls: ['./schedule-column.component.css']
})
export class ScheduleColumnComponent implements OnInit {
  @Input()
  options: Array<ShortUserData>;
  @Input()
  title: String;
  @Input()
  schedule;
  @Input()
  disabled: boolean;
  @Input()
  index: number;
  @Output()
  columnChanged = new EventEmitter<any>();
  constructor() { }
  ngOnInit() {
  }

  onCellChanged(event) {
    this.schedule[parseInt(event.index, 10)].selected = event.selection;
    this.columnChanged.emit( {schedule: this.schedule, index: { col: this.index, row: event.index } } );
  }
}
