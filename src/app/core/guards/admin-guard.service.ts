import { UserService } from './../user.service';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { Roles } from './../../shared/enums';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService
   ) { }

   canActivate(): boolean {
    return +this.userService.currentUser.role === Roles.administrator;
  }
  canActivateChild(): boolean {
    return +this.userService.currentUser.role === Roles.administrator;
  }

}
