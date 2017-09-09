import { Router } from '@angular/router';
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
  classNames: Array<ShortListUserData>;
  teachers: Array<ShortUserData>;
  selectedTeacher: ShortUserData;
  selectedClass: ShortUserData;
  error;
  possibleSchoolYears = SchoolYears.slice();
  possibleClasses = possibleClasses();

  constructor(
    private studentService: StudentsService,
    private teachersService: TeachersService,
    private classesService: ClassesService,
    private toasterService: ToasterService,
    private userService: UserService,
    private router: Router
  ) {
    this.teachersService
      .getAllTeachers()
      .then((teachers) => {
        this.teachers = teachers;
      });
    this.classesService
      .getAvailableClasses()
      .then((classNames) => {
        this.classNames = classNames;
      });
  }

  ngOnInit() {

  }

  onTeacherChange(uid: string) {
    this.selectedTeacher = this.teachers.find((el) => el.uid === uid);
  }

  onClassChange(uid) {
    this.selectedClass = this.classNames.find((el) => el.uid === uid);
    this.students = this.studentService.getAvailableStudents();
  }
  createClass() {
    const classData = new ClassData();
    classData.leadTeacher = this.selectedTeacher;
    const c = ClassData.fromClassName( this.selectedClass.name );
    classData.schoolYear = c.schoolYear;
    classData.class_name = c.class_name;
    classData.students = this.students
      .filter((student) => student.include)
      .map((student) => new ShortUserData(student));
    this.classesService.createClass(classData)
      .then((cls) => {
        this.error = false;
        this.toasterService.pop('success', `Class ${classData.displayName} successfully created!`);
        this.router.navigate(['/admin/class/edit/' + cls.key ]);
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

}
