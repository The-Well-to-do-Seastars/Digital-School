import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent implements OnInit {

  @Input()
  students;

  @Input()
  type: string;
  constructor() { }

  ngOnInit() {
  }

}
