import { Schedule } from './../../models/schedule';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dschool-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

  @Input()
  model = new Schedule();

  @Output()
  scheduleChanged = new EventEmitter<any>();
  constructor() {
   }
  ngOnInit() {
  }

  onColumnChanged( event ) {
    this.model.columns[ parseInt( event.index.col, 10 ) ].schedule = event.schedule;
    this.scheduleChanged.emit( { schedule: this.model, changeAt: event.index } );
  }
}
