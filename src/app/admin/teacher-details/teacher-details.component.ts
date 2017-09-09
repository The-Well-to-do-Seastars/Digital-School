import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { TeachersService } from './../../core/teachers.service';
import { ClassData, generateClassNames } from './../../shared/models';
import { possibleClasses } from './../../shared/enums';
import { TeacherData, ShortUserData } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  error;
  model: TeacherData | any = new TeacherData();
  originalModel: TeacherData;
  selectedCourse: number = -1;
  selectedClasses: Array<string> = [];
  _possibleClasses: Array<string>;
  constructor(
    private teachersService: TeachersService,
    private route: ActivatedRoute,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.teachersService
      .getById(this.route.snapshot.paramMap.get('uid'))
      .then((teacher) => {
        this.model = TeacherData.fromDatabase(teacher);
        this.originalModel = TeacherData.fromDatabase(teacher);
      });
  }

  get possibleClasses(): Array<string> {
    return this._possibleClasses;
  }

  set possibleClasses(classes) {
    this._possibleClasses = generateClassNames(classes, possibleClasses());
  }
  onCourseChange(value) {
    if (this.selectedCourse >= 0) {
      this.model.courses[this.selectedCourse].classes = this.selectedClasses;
    }
    this.selectedCourse = this.model.courses.findIndex(el => el.uid === value);
    this.possibleClasses = this.model.courses[this.selectedCourse].schoolYears;
    this.selectedClasses = this.model.courses[this.selectedCourse].classes || [];
  }

  onSubmit() {
    this.model.courses[this.selectedCourse].classes = this.selectedClasses;
    this.teachersService.updateTeacher(this.model, this.originalModel)
    .then(() => {
      this.error = false;
      this.toasterService.pop('success', 'Teacher updated!');
      this.originalModel = TeacherData.fromDatabase( this.model );
    })
    .catch((err) => {
      this.error = err.message;
    });

  }
}
