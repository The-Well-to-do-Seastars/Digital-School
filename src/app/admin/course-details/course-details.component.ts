import { ClassData } from './../../shared/models/class';
import { TeachersService } from './../../core/teachers.service';
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
  model: CourseData | any = new CourseData();
  originalModel: CourseData;
  error;
  possibleYears = SchoolYears
    .slice()
    .map((el) => {
      const compatibleEl = new ShortUserData({ uid: el.value.toString(), name: el.name });
      return compatibleEl;
    });
  possibleTeachers: Array<ShortUserData>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private toasterService: ToasterService,
    private teachersService: TeachersService
  ) { }

  ngOnInit() {
    this.teachersService
      .getAllTeachers()
      .then((teachers) => this.possibleTeachers = teachers);
    this.coursesService
      .getById(this.route.snapshot.paramMap.get('uid'))
      .then((course) => {
        this.originalModel = CourseData.fromModel(course);
        course.schoolYears = course.schoolYears
          .map(yearNumber => this.possibleYears[this.possibleYears.findIndex(year => year.uid === yearNumber)]);
        this.model = course;
      })
      .catch((err) => {
        this.toasterService.pop('error', 'Something went wrong!', err.message);
      });
  }

  onSubmit() {
    const compatibleModel: CourseData | any = CourseData.fromModel(this.model);
    compatibleModel.schoolYears = compatibleModel.schoolYears
      .map(year => year.uid);
    this.coursesService.updateCourse(compatibleModel, this.originalModel)
      .then(() => {
        this.error = false;
        this.toasterService.pop('success', 'Course updated!');
        this.originalModel = CourseData.fromModel( compatibleModel );
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
