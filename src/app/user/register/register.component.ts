import { UserService } from './../../core/user.service';
import { LoginData } from './../../shared/models/login';
import { RegisterData } from './../../shared/models/register';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterData('', '', '');
  error: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    const data = new LoginData( this.model.email, this.model.password )
    this.userService.register(this.model)
      .then( () => {
        this.error = false;
      })
      .catch( (err) => {
        this.error = err.message;
      });
  }
}
