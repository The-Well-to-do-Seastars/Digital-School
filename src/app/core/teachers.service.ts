import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShortUserData, UserData } from '../shared/models';
import { Roles } from '../shared/enums';

@Injectable()
export class TeachersService {

  constructor(
    private afData: AngularFireDatabase
  ) { }

  getAllTeachers(): Array<ShortUserData> {
    const teachers = [];
    const classData = this.afData.list('users/', { query: { orderByChild: 'role', equalTo: Roles.teacher.toString() } } );
    const newSubscription = classData.subscribe( (snapshot) => {
      snapshot.forEach( (child) => {
        const student = UserData.fromModel( child );
          teachers.push( ShortUserData.fromModel( student ) );
      });
      newSubscription.unsubscribe();
    } );
    return teachers;
  }
}
