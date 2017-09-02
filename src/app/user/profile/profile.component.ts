import { ToasterService } from 'angular2-toaster';
import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../shared/models';
import { Classes, Roles } from '../../shared/enums';

@Component({
  selector: 'dschool-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: UserData;
  newInfo: UserData;
  error: string;
  possibleClasses: Array<{value: any, name: any }> = [];
  possibleYears: Array<number> = [];

  possibleRoles: Array<{value: any, name: any }> = [];
  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {

    for (const c in Classes) {
      if (Classes.hasOwnProperty(c) && isNaN(Number(c))) {
        this.possibleClasses.push({ value: Classes[c], name: c });
      }
    }

    for (const r in Roles) {
      if (Roles.hasOwnProperty(r) && isNaN(Number(r))) {
        this.possibleRoles.push({ value: Roles[r], name: r });
      }
    }

    const starrtingYear = new Date().getFullYear();
    const possibleYears = [];
    for (let i = starrtingYear - 10; i <= starrtingYear; i += 1) {
      this.possibleYears.push(i);
    }
  }

  ngOnInit() {
    this.model = this.userService.currentUser;
  }


  onSubmit( firstName, lastName ) {
    this.newInfo = UserData.fromModel( this.model );
    this.newInfo.firstName = firstName;
    this.newInfo.lastName = lastName;
    this.userService.updateUserInfo(this.newInfo)
      .then(() => {
        this.error = '';
        this.toasterService.pop('success', 'Your profile has been successfully updated!');
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

}
