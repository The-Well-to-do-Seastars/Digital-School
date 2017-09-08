import { ShortUserData } from './../models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dschool-multy-select-line',
  templateUrl: './multy-select-line.component.html',
  styleUrls: ['./multy-select-line.component.css']
})
export class MultySelectLineComponent implements OnInit {

  @Input()
  choice: ShortUserData;
  @Output()
  onRemove = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.onRemove.emit( this.choice.uid );
  }
}
