import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { UsermenuComponent } from './usermenu/usermenu.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [UsermenuComponent, LoginComponent],
  exports: [
    UsermenuComponent
  ]
})
export class UserModule { }
