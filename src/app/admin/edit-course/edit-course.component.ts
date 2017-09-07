import { Router } from '@angular/router';
import { CoursesService } from './../../core/courses.service';
import { CourseData } from './../../shared/models/course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courses: Array<CourseData>;
  selected: string;

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.courses = this.coursesService.getAll();
  }

  ngOnInit() {
  }
  oncourseChange( course ) {
    this.selected = course;
  }

  onSubmit() {
    this.router.navigate( ['/admin/course/edit/' + this.selected ]);
  }
}
