import { element } from 'protractor';
import { ClassesService } from './classes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShortUserData, UserData, TeacherData } from '../shared/models';
import { Roles } from '../shared/enums';
import * as firebase from 'firebase/app';
import { copyObject } from './../shared/utils';

@Injectable()
export class TeachersService {

  constructor(
    private afData: AngularFireDatabase,
    private classesService: ClassesService
  ) { }

  getAllTeachers(detailed?: boolean): firebase.Promise<any> {
    const query = firebase.database().ref('users').orderByChild('role').equalTo(Roles.teacher.toString());
    return query.once('value')
      .then((snapshot) => {
        const teachers = [];
        snapshot.forEach(child => {
          const childData = child.val();
          let teacher;
          if (detailed) {
            teacher = TeacherData.fromModel(childData);
          } else {
            teacher = ShortUserData.fromModel(UserData.fromModel(childData));
          }
          teacher.uid = child.key;
          teachers.push(teacher);
        });
        return Promise.resolve(teachers);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  getById(uid): firebase.Promise<any> {
    const query = firebase.database().ref('users').orderByKey().equalTo(uid);
    return query.once('value')
      .then((snapshot) => {
        let teacher;
        snapshot.forEach(child => {
          const childData = child.val();
          teacher = TeacherData.fromModel(childData);
          teacher.uid = child.key;
        });
        return Promise.resolve(teacher);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  update(model) {
    return this.afData.list('/users').update(model.uid, model);
  }

  updateTeacher(model: TeacherData, originalModel: TeacherData): firebase.Promise<any> {
    const teacherUpdate = this.afData.list('users/').update(model.uid, model);
    let addClasses = [];
    if (model.courses) {
      model.courses.forEach((course) => {
        const originalCourse = originalModel.courses.find((el) => el.uid === course.uid) || [];
        const compare = course.classes || [];
        const compareTo = originalCourse.classes || [];
        const toAdd = compare
          .filter(el =>
            compareTo.findIndex((e) => e.uid === el.uid) === -1
          )
          .map(element => {
            const el = copyObject(element);
            el.course = new ShortUserData({
              name: course.name,
              uid: course.uid
            });
            el.course.teacher = new ShortUserData({
              name: model.displayName,
              uid: model.uid
            });
            return el;
          });
        addClasses = addClasses.concat(toAdd);
      });
    }
    let removeClasses = [];
    if (originalModel.courses) {
      originalModel.courses.forEach((course) => {
        const modelCourse = model.courses.find((el) => el.uid === course.uid) || [];
        const compare = course.classes || [];
        const compareTo = modelCourse.classes || [];
        const toAdd = compare
          .filter(el =>
            compareTo.findIndex((e) => e.uid === el.uid) === -1
          )
          .map(element => {
            const el = copyObject(element);
            el.course = new ShortUserData({
              name: course.name,
              uid: course.uid
            });
            return el;
          });
        removeClasses = removeClasses.concat(toAdd);
      });
    }

    const classesUpdate = [];
    addClasses.forEach((classToAdd) => {
      classesUpdate.push(this.classesService
        .getByName(classToAdd.name)
        .then((currentClass) => {
          if (!currentClass) {
            return null;
          }
          if (!currentClass.courses || currentClass.courses.findIndex(el => el.uid === model.uid) === -1) {
            currentClass.courses = currentClass.courses || [];
            currentClass.courses.push(classToAdd.course);
          }
          return currentClass;
        })
        .then((currentClass) => {
          if (!currentClass) {
            return null;
          }
          return this.classesService.update(currentClass);
        })
      );
    });
    removeClasses.forEach((classToRemove) => {
      classesUpdate.push(this.classesService
        .getByName(classToRemove.name)
        .then((currentClass) => {
          if (!currentClass) {
            return null;
          }
          currentClass.courses = currentClass.courses || [];
          const index = currentClass.courses.findIndex(el => el.uid === classToRemove.course.uid);
          currentClass.courses.splice(index, 1);
          return currentClass;
        })
        .then((currentClass) => {
          if (!currentClass) {
            return null;
          }
          return this.classesService.update(currentClass);
        })
      );
    });

    return Promise.all([teacherUpdate, Promise.all(classesUpdate)]);
  }
}



