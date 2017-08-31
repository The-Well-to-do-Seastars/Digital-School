import { Router } from '@angular/router';
import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  user: any;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = userService.user;
  }

  ngOnInit() {
  }

  goto(subroute: string) {
    this.router.navigate(['/user/' + subroute]);
  }
  logout() {
    this.userService.logout();
  }

}
