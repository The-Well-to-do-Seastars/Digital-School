import { Router } from '@angular/router';
import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  get username(): string {
    return this.userService.currentUser.displayName;
  }

  get loggedIn() {
    return this.userService.loggedIn;
  }

  logout() {
    this.userService.logout()
      .then( () => {
        this.router.navigate( ['/home'] );
      });
  }

}
