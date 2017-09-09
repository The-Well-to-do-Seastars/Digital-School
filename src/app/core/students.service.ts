import { UserData, ShortUserData, ShortListUserData } from './../shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Classes, GetSchoolYear } from '../shared/enums';
import * as firebase from 'firebase/app';

@Injectable()
export class StudentsService {

  subscriptions: Array<Subscription>;

  constructor(
    private afData: AngularFireDatabase
  ) { }

  getAvailableStudents(): Array<ShortListUserData> {
    const students = [];
    const classData = this.afData.list('users/', { query: { orderByChild: 'role', equalTo: 0 } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      snapshot.forEach( (child) => {
        let student = new UserData();
        student = UserData.fromModel( child, student );
        student.shoolYear = child.shoolYear;
        student.class_number = child.class_number;
        if ( student.class_number === undefined && student.shoolYear === undefined ) {
          students.push( ShortUserData.fromModel( student ) );
        }
      });
      newSubscription.unsubscribe();
    } );
    return students;
  }

  getStudentById( uid ): firebase.Promise<any> {
    return firebase.database().ref('users')
      .orderByKey().equalTo( uid )
      .once( 'value' )
      .then( (snapshot) => {
        let student;
        snapshot.forEach( (child) => {
          student = child.val();
          student.uid = child.key;
        });
        return Promise.resolve(student);
      });
  }

  update(model) {
    return this.afData.list('/users').update(model.uid, model);
  }
  getStudentsFromClass( schoolYear: number, classNumber: Classes ): Array<ShortListUserData> {
    const students = [];
    const classData = this.afData.list('users/', { query: { orderByChild: 'role', equalTo: 0 } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      snapshot.forEach( (child) => {
        const student = UserData.fromModel( child );
        if ( ( student.class_number === +classNumber && student.shoolYear === schoolYear ) ) {
          students.push( new ShortListUserData( ShortUserData.fromModel( student ) ) );
        }
      });
      newSubscription.unsubscribe();
    } );
    return students;
  }
}
