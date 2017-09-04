import { UserData, ShortUserData } from './../shared/models/user';
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

  getStudentsFromClass( schoolYear: number, classNumber: Classes ): Array<ShortUserData> {
    const students = [];
    const classData = this.afData.list('users/', { query: { orderByChild: 'shoolYear', equalTo: schoolYear.toString() } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      snapshot.forEach( (child) => {
        const student = UserData.fromModel( child );
        console.log(child);
        if ( student.class_number === classNumber && student.role === 0 ) {
          students.push( ShortUserData.fromModel( student ) );
        }
      });
      newSubscription.unsubscribe();
    } );
    return students;
  }
}
