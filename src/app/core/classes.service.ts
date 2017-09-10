import { Schedule } from './../shared/models/schedule';
import { StudentsService } from './students.service';
import { TeachersService } from './teachers.service';
import { Subscription } from 'rxjs/Subscription';
import { ValueNamePair, ClassData, ShortUserData, generateClassNames, TeacherData } from './../shared/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Classes, GetSchoolYear, possibleClasses, SchoolYears } from '../shared/enums';
import * as firebase from 'firebase/app';
import { Roles } from '../shared/enums';

@Injectable()
export class ClassesService {

  subscriptions: Array<Subscription>;

  constructor(
    private afData: AngularFireDatabase,
    private studentsService: StudentsService
  ) { }

  getClass(schoolYear: number, classNumber: Classes) {
    const year = GetSchoolYear(schoolYear);
    const classData = this.afData.list('classes/', { query: { orderByChild: 'class', equalTo: `${year}${classNumber}` } });
    const newSubscription = classData.subscribe((snapshot) => {
      return ClassData.fromModel(snapshot[0]);
    });
    this.subscriptions.push(newSubscription);
  }
  getClassById(uid): firebase.Promise<any> {
    const query = firebase.database().ref('classes').orderByKey().equalTo(uid);
    return query.once('value')
      .then((snapshot) => {
        let classData;
        snapshot.forEach(child => {
          classData = child.val();
          classData.uid = child.key;
        });
        return Promise.resolve(classData);
      });
  }
  createClass(model) {
    const className = ClassData.className(model.schoolYear, model.class_name);
    const query = firebase.database().ref('users').orderByChild('role').equalTo(Roles.teacher.toString());
    return query.once('value')
      .then((snapshot) => {
        const teachers = [];
        snapshot.forEach(child => {
          const childData = child.val();
          let teacher;
          teacher = TeacherData.fromModel(childData);
          teacher.uid = child.key;
          teachers.push(teacher);
        });
        return teachers;
      })
      .then((teachers) => {
        const coursesToAdd = [];
        teachers
          .filter((teacher) => {
            if (!teacher.courses) {
              return false;
            }
            teacher.courses = teacher.courses
              .filter((course) => course.classes.findIndex(el => el.name === className) !== -1);
            return teacher.courses.length > 0;
          })
          .forEach((teacher) => {
            teacher.courses.forEach((course) => {
              const res: any = {};
              res.name = course.name;
              res.uid = course.uid;
              res.teacher = ShortUserData.fromModel(teacher);
              coursesToAdd.push(res);
            });
          });

        model.courses = coursesToAdd;

        const studentPromises = [];
        model.students.forEach((student) => {
          studentPromises.push(this.studentsService
            .getStudentById(student.uid)
            .then((dbStudent) => {
              dbStudent.shoolYear = model.schoolYear;
              dbStudent.class_number = model.class_name;
              return this.studentsService.update(dbStudent);
            })
          );
        });
        return Promise.all([
          this.afData.list('classes/').push(model),
          Promise.all(studentPromises)
        ]);
      });
  }

  update(model) {
    return this.afData.list('/classes').update(model.uid, model);
  }
  getByName(name): firebase.Promise<any> {
    const classData = ClassData.fromClassName(name);
    const query = firebase.database().ref('classes')
      .orderByChild('schoolYear').equalTo(classData.schoolYear);
    return query.once('value')
      .then((snapshot) => {
        let dbClass = null;
        snapshot.forEach(child => {
          const childData = child.val();
          if (childData.class_name === classData.class_name) {
            dbClass = child.val();
            dbClass.uid = child.key;
          }
        });
        return Promise.resolve(dbClass);
      });
  }

  getAvailableClasses(): firebase.Promise<any> {
    const query = firebase.database().ref('classes');
    return query.once('value')
      .then((snapshot) => {
        const availabe = generateClassNames(
          SchoolYears.slice().map((year) => year.value),
          possibleClasses());
        snapshot.forEach(child => {
          const childData = child.val();
          const index = availabe
            .findIndex(av => ClassData.className(childData.schoolYear, childData.class_name) === av.name);
          if (index !== -1) {
            availabe.splice(index, 1);
          }
        });
        return Promise.resolve(availabe);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  getAllClassNames(): firebase.Promise<any> {
    const query = firebase.database().ref('classes');
    return query.once('value')
      .then((snapshot) => {
        const classNames = [];
        snapshot.forEach(child => {
          const childData = child.val();
          const className = new ShortUserData({
            name: ClassData.className(childData.schoolYear, childData.class_name),
            uid: child.key
          });
          classNames.push(className);
        });
        return Promise.resolve(classNames);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  private getTeacherById(uid): firebase.Promise<any> {
    return firebase.database().ref('users')
      .orderByChild('role').equalTo(Roles.teacher.toString())
      .once('value')
      .then((snapshot) => {
        let teacher;
        snapshot.forEach(child => {
          if (child.key === uid) {
            teacher = child.val();
            teacher.uid = child.key;
          }
        });
        return Promise.resolve(teacher);
      });
  }
  updateClassSchedule(model, oldClass, newClass, changeAt): firebase.Promise<any> {
    const newTeacher = newClass.selected ? newClass.selected.teacher : null;
    const oldTeacher = oldClass.selected ? oldClass.selected.teacher : null;
    let teachersUpdates = [];
    let oldTeacherPromise = null;
    if (oldTeacher) {
      oldTeacherPromise = this.getTeacherById(oldTeacher.uid);
    }
    let newTeacherPromise = null;
    if (newTeacher) {
      newTeacherPromise = this.getTeacherById(newTeacher.uid);
    }
    return Promise.all([oldTeacherPromise, newTeacherPromise])
      .then(([oldT, newT]) => {
        teachersUpdates = [];
        if (oldT) {
          oldT.schedule = oldT.schedule || new Schedule();
          oldT.schedule.columns[changeAt.col].schedule[changeAt.col].selected = null;
          teachersUpdates.push(this.afData.list('/users').update(oldT.uid, oldT));
        }
        if (newT) {
          newT.schedule = newT.schedule || new Schedule();
          const updatedClass = {
            name: ClassData.className(model.schoolYear, model.class_name),
            uid: model.uid,
            course: { name: newClass.selected.name, uid: newClass.selected.uid }
          };
          newT.schedule.columns[changeAt.col].schedule[changeAt.col].selected = updatedClass;
          teachersUpdates.push(this.afData.list('/users').update( newT.uid, newT ));
        }
        const classUpdate = this.update(model);
        return Promise.all([classUpdate, Promise.all(teachersUpdates)]);
      });
  }
}
