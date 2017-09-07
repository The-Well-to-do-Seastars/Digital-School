import { CourseData } from './../shared/models/course';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable()
export class CoursesService {

constructor(
    private afData: AngularFireDatabase
) { }

createCourse( model: CourseData): firebase.Promise<any> {
    return this.afData.list('/courses').push( model );
}

getAll(): Array<CourseData> {
    const courses = [];
    const coursesData = this.afData.list('courses/');
    const newSubscription = coursesData.subscribe( (snapshot) => {
      snapshot.forEach( (child) => {
        const course = CourseData.fromModel( child );
        courses.push( course );
      });
      newSubscription.unsubscribe();
    } );
    return courses;
}
}
