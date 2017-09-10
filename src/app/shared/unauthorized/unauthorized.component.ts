import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  @Input()
  show = true;

  constructor() { }

  ngOnInit() {
  }

}
