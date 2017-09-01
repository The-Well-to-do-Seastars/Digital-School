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
    this.user = this.userService.currentUser.displayName;
  }

  ngOnInit() {
  }
  get username(): string {
    return this.userService._currentUser.displayName;
  }

  get loggedIn() {
    return this.userService.loggedIn;
  }

  goto(subroute: string) {
    this.router.navigate(['/user/' + subroute]);
  }
  logout() {
    this.userService.logout()
      .then( () => {
        this.router.navigate( ['/home'] );
      });
  }

}
