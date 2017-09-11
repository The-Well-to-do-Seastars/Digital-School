import { ProfileGuardService } from './../core/guards/profile-guard.service';
import { ScheduleGuardService } from './../core/guards/schedule-guard.service';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuardService]
  },
  {
    path: 'schedule/:role',
    component: UserScheduleComponent,
    canActivate: [ScheduleGuardService]
  },
  { path: '**', redirectTo: '/not_found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
