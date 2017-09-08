import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShortUserData, UserData, TeacherData } from '../shared/models';
import { Roles } from '../shared/enums';
import * as firebase from 'firebase/app';

@Injectable()
export class TeachersService {

  constructor(
    private afData: AngularFireDatabase
  ) { }

  getAllTeachers(): firebase.Promise<any> {
    const query = firebase.database().ref('users').orderByChild('role').equalTo(Roles.teacher.toString());
    return query.once('value')
      .then((snapshot) => {
        const teachers = [];
        snapshot.forEach(child => {
          const childData = child.val();
          const teacher = ShortUserData.fromModel(UserData.fromModel(childData));
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

  update( model ) {
    return this.afData.list('/users').update(model.uid, model);
  }
}



