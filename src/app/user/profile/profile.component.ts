import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

}
