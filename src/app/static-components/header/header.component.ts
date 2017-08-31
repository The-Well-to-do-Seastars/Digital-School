import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input()
  schoolName: string;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  goto_Home() {
    this.router.navigate( ['/home'] );
  }
}
