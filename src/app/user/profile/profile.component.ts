import { ToasterService } from 'angular2-toaster';
import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';
import { UserData, ValueNamePair } from '../../shared/models';
import { Classes, Roles, SchoolYears, possibleClasses } from '../../shared/enums';
import { copyObject } from './../../shared/utils';

@Component({
  selector: 'dschool-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: UserData;
  newInfo: UserData;
  error: string;
  possibleClasses: Array<ValueNamePair> = [];
  possibleYears: Array<ValueNamePair> = [];
  possibleSchoolYears: Array<ValueNamePair> = SchoolYears.slice();

  possibleRoles: Array<{value: any, name: any }> = [];
  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {

    this.possibleClasses = possibleClasses();

    for (const r in Roles) {
      if (Roles.hasOwnProperty(r) && isNaN(Number(r))) {
        this.possibleRoles.push({ value: Roles[r], name: r });
      }
    }

    const starrtingYear = new Date().getFullYear();
    const possibleYears = [];
    for (let i = starrtingYear - 10; i <= starrtingYear; i += 1) {
      this.possibleYears.push( { value: i, name: i });
    }
  }

  ngOnInit() {
    this.model = copyObject( this.userService.currentUser );
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

  get loggedIn() {
    return this.userService.loggedIn;
  }

}
