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

  user: UserData;
  admin = Roles.administrator.toString();

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.user = this.userService.currentUser;
  }

  ngOnInit() {
  }

  goto_Home() {
    this.router.navigate( ['/home'] );
  }
}
