import { ToasterService } from 'angular2-toaster';
import { CoursesService } from './../../core/courses.service';
import { CourseData } from './../../shared/models/course';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  error: any;
  model: CourseData = new CourseData();
    constructor(
      private router: Router,
      private coursesService: CoursesService,
      private toasterService: ToasterService
    ) {}

    ngOnInit(): void {
    }

    onSubmit() {
      this.coursesService.createCourse(this.model)
        .then((course) => {
          this.error = false;
          this.toasterService.pop('success', 'Successfully created:', this.model.name );
          this.router.navigate(['/admin/course/edit/' + course.key]);
        })
        .catch( (err) => {
          this.error = err.message;
        });
    }

}
