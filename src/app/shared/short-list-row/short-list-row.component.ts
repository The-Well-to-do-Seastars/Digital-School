import { Component, OnInit, Input } from '@angular/core';
import { ShortListUserData } from '../models';

@Component({
  selector: 'dschool-short-list-row',
  templateUrl: './short-list-row.component.html',
  styleUrls: ['./short-list-row.component.css']
})
export class ShortListRowComponent implements OnInit {

  @Input()
  student: ShortListUserData;

  constructor() { }

  ngOnInit() {
  }

}
