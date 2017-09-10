import { TeachersService } from './../../core/teachers.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Schedule } from './../../shared/models';
import { copyObject } from './../../shared/utils';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ClassesService } from './../../core/classes.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'dschool-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  model;
  originalSchedule;
  schedule;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
    private toasterService: ToasterService,
    private teachersService: TeachersService
  ) {
    const classUid = this.route.snapshot.paramMap.get('uid');
    this.classesService
      .getClassById(classUid)
      .then((classData) => {
        this.model = classData;
        this.schedule = new Schedule(this.model);
        this.originalSchedule = copyObject(this.schedule);
      });

  }

  ngOnInit() {

  }

  onScheduleChanged({ schedule, changeAt }) {
    this.model.schedule = schedule.columns;
    const newClass = copyObject(this.model.schedule[changeAt.col].schedule[changeAt.row]);
    const oldClass = copyObject(this.originalSchedule.columns[changeAt.col].schedule[changeAt.row]);
    this.originalSchedule = copyObject(this.schedule);
    this.classesService
      .updateClassSchedule( this.model, oldClass, newClass, changeAt )
      .catch((err) => {
        this.toasterService.pop('error', err.message);
      });

  }

}
