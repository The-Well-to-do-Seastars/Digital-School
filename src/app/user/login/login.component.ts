import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../shared/models';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'dschool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new LoginData('', '');
  error: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService
   ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.model)
      .then( () => {
        this.error = false;
        this.toasterService.pop('success', 'Welcome!');
        this.router.navigate( ['/home'] );
      })
      .catch( (err) => {
        this.error = err.message;
      });
  }
}
