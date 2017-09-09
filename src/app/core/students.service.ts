import { UserData, ShortUserData, ShortListUserData } from './../shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Classes, GetSchoolYear } from '../shared/enums';

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
        student.shoolYear = undefined;
        student.class_number = undefined;
        student = UserData.fromModel( child, student );
        if ( student.class_number === undefined && student.shoolYear === undefined ) {
          students.push( ShortUserData.fromModel( student ) );
        }
      });
      newSubscription.unsubscribe();
    } );
    return students;
  }
  // getStudentsFromClass( schoolYear: number, classNumber: Classes ): Array<ShortListUserData> {
  //   const students = [];
  //   const classData = this.afData.list('users/', { query: { orderByChild: 'role', equalTo: 0 } } );
  //   const newSubscription = classData.subscribe( (snapshot) => {
  //     snapshot.forEach( (child) => {
  //       const student = UserData.fromModel( child );
  //       if ( ( student.class_number === +classNumber && student.shoolYear === schoolYear ) ) {
  //         students.push( new ShortListUserData( ShortUserData.fromModel( student ) ) );
  //       }
  //     });
  //     newSubscription.unsubscribe();
  //   } );
  //   return students;
  // }
}
