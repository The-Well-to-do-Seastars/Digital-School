import { ShortUserData } from './../../shared/models/user';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { CoursesService } from './../../core/courses.service';
import { CourseData } from './../../shared/models/course';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SchoolYears } from '../../shared/enums';

@Component({
  selector: 'dschool-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  model = new CourseData();
 error;
  possibleYears = SchoolYears
    .slice()
    .map((el) => {
      const compatibleEl = new ShortUserData( { uid: el.value.toString(), name: el.name });
      return compatibleEl;
    });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.coursesService
      .getById(this.route.snapshot.paramMap.get('uid'))
      .then((course) => {
        this.model = course;
      })
      .catch((err) => {
        this.toasterService.pop('error', 'Something went wrong!', err.message);
      });
  }

  onSubmit() {
    console.log('submitting');
  }
}
