import { UserService } from './../../core/user.service';
import { UserData } from './../../shared/models';
import { Roles } from './../../shared/enums';
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
  admin: any = Roles.administrator.toString();

  constructor(
    private router: Router,
    public userService: UserService
  ) {
  }

  ngOnInit() {
  }

  goto_Home() {
    this.router.navigate( ['/home'] );
  }
}
