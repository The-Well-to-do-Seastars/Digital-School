import { ClassesService } from './../../core/classes.service';
import { UserService } from './../../core/user.service';
import { StudentsService } from './../../core/students.service';
import { TeachersService } from './../../core/teachers.service';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Roles } from './../../shared/enums';
import { Schedule } from '../../shared/models/index';

@Component({
  selector: 'dschool-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent implements OnInit {
  schedule = new Schedule();
  error;

  constructor(
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private userService: UserService,
    private classesService: ClassesService
  ) {
    const role = this.route.snapshot.paramMap.get('role');
    let promise;
    if (role === Roles.teacher.toString()) {
      promise = this.teachersService
        .getById(userService.currentUser.uid, true);
    } else if (role === Roles.student.toString()) {
      promise = this.classesService
        .getClassByStudent( this.userService.currentUser );
    }
    promise
      .then( (model) => {
        this.schedule = new Schedule(model, true );
      })
      .catch( (err) => {
        this.error = err.message;
      });
  }

  ngOnInit() {
  }

}
