import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { Roles } from '../../shared/enums/roles.enum';

@Injectable()
export class ScheduleGuardService {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const userRole = +this.userService.currentUser.role;
    if (userRole === Roles.student || userRole === Roles.teacher) {
      return true;
    } else {
      this.router.navigate( ['/unauthorized']);
      return false;
    }
  }
}
