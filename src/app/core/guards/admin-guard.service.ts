import { UserService } from './../user.service';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Roles } from './../../shared/enums';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (+this.userService.currentUser.role === Roles.administrator) {
      return true;
    } else {
      this.router.navigate( ['/unauthorized']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }

}
