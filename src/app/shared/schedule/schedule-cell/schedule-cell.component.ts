import { ShortUserData } from './../../models/user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dschool-schedule-cell',
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.css']
})
export class ScheduleCellComponent implements OnInit {

  @Input()
  options: Array<ShortUserData>;
  @Input()
  selected: ShortUserData;
  @Input()
  title: String;
  @Input()
  disabled: boolean;
  @Input()
  index: number;
  @Output()
  onChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  selectionChanged( uid ) {
    if (uid === 'null') {
      this.onChange.emit( { selection: null, index: this.index } );
      return;
    }
    this.selected = this.options.find( (option) => option.uid === uid );
    this.onChange.emit( { selection: this.selected, index: this.index } );
  }
}
