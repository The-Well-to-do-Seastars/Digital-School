import { CourseData } from './../models/course';
import { ShortUserData } from './../models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-name-select',
  templateUrl: './name-select.component.html',
  styleUrls: ['./name-select.component.css']
})
export class NameSelectComponent implements OnInit {

  @Input()
  users: Array<ShortUserData> | Array<CourseData>;
  @Input()
  title: string;
  selected;
  constructor() { }

  ngOnInit() {
  }

}
