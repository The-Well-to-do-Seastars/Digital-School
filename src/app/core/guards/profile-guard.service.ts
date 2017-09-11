import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { Roles } from '../../shared/enums/roles.enum';

@Injectable()
export class ProfileGuardService {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const userRole = +this.userService.currentUser.role;
    if (userRole > 0) {
      return true;
    } else {
      this.router.navigate( ['/unauthorized']);
      return false;
    }
  }
}
