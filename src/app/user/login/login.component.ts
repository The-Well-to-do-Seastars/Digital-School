import { UserService } from './../../core/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../shared/models/login';

@Component({
  selector: 'dschool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new LoginData('', '');
  error: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.model)
      .then( () => {
        this.error = false;
      })
      .catch( (err) => {
        this.error = err.message;
      });
  }
}
