import { UserService } from './../../core/user.service';
import { ToasterService } from 'angular2-toaster';
import { ClassesService } from './../../core/classes.service';
import { ClassData } from './../../shared/models/class';
import { TeachersService } from './../../core/teachers.service';
import { ShortUserData } from './../../shared/models/user';
import { ShortListUserData, UserData } from './../../shared/models';
import { SchoolYears, possibleClasses, Classes } from './../../shared/enums';
import { StudentsService } from './../../core/students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dschool-generate-class',
  templateUrl: './generate-class.component.html',
  styleUrls: ['./generate-class.component.css']
})
export class GenerateClassComponent implements OnInit {

  students: Array<ShortListUserData>;
  teachers: Array<ShortUserData>;
  classData = { shoolYear: 0, classNumber: 0 };
  selectedTeacher: ShortUserData;
  error;
  possibleSchoolYears = SchoolYears.slice();
  possibleClasses = possibleClasses();
  user: UserData;

  constructor(
    private studentService: StudentsService,
    private teachersService: TeachersService,
    private classesService: ClassesService,
    private toasterService: ToasterService,
    private userService: UserService
  ) {
    this.teachersService
      .getAllTeachers()
      .then( (teachers) => {
        this.teachers = teachers;
      });
    this.user = this.userService.currentUser;
  }

  ngOnInit() {

  }

  getStudents() {
    this.students = this.studentService.getStudentsFromClass(this.classData.shoolYear, this.classData.classNumber);
  }

  onTeacherChange(uid: string) {
    this.selectedTeacher = this.teachers[this.teachers.findIndex((el) => el.uid === uid)];
  }
  generate() {
    const classData = new ClassData();
    classData.leadTeacher = this.selectedTeacher;
    classData.schoolYear = this.classData.shoolYear;
    classData.class_name = this.classData.shoolYear;
    classData.students = this.students
      .filter((student) => student.include)
      .map((student) => new ShortUserData(student));
    this.classesService.createClass(classData)
      .then(() => {
        this.error = false;
        this.toasterService.pop('success', `Class ${classData.displayName} successfully created!`);
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

}
