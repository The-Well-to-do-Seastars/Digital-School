import { UsermenuComponent } from './../../user/usermenu/usermenu.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input()
 schoolName: string;

  constructor() { }

  ngOnInit() {
  }

}
