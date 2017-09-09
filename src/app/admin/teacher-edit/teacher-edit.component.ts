import { Router } from '@angular/router';
import { TeachersService } from './../../core/teachers.service';
import { TeacherData } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  teachers: Array<TeacherData>;
  selected: string;

  constructor(
    private teachersService: TeachersService,
    private router: Router
  ) {
    this.teachersService
      .getAllTeachers()
      .then( (teachers) => this.teachers = teachers );
  }

  ngOnInit() {
  }
  oncourseChange( teacher ) {
    this.selected = teacher;
  }

  onSubmit() {
    this.router.navigate( ['/admin/teacher/edit/', this.selected ]);
  }
}
