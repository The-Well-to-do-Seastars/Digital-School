import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  user: any;
  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
