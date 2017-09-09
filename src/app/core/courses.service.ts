import { ShortUserData } from './../shared/models/user';
import { TeachersService } from './teachers.service';
import { CourseData } from './../shared/models/course';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable()
export class CoursesService {

    constructor(
        private afData: AngularFireDatabase,
        private teachersService: TeachersService
    ) { }

    createCourse(model: CourseData): firebase.Promise<any> {
        return this.afData.list('/courses').push(model);
    }

    getAll(): Array<CourseData> {
        const courses = [];
        const coursesData = this.afData.list('courses/');
        const newSubscription = coursesData.subscribe((snapshot) => {
            snapshot.forEach((child) => {
                const course = CourseData.fromModel(child);
                courses.push(course);
            });
            newSubscription.unsubscribe();
        });
        return courses;
    }

    getById(uid): any {
        const query = firebase.database().ref('courses').orderByKey().equalTo(uid);
        return query.once('value')
            .then((snapshot) => {
                let course: CourseData ;
                snapshot.forEach((child) => {
                    const childData = child.val();
                    course = CourseData.fromModel(childData);
                    course.uid = child.key;
                });
                return Promise.resolve( course );
            })
            .catch((err) => {
                return Promise.reject( err );
            });
    }

    updateCourse(model: CourseData, originalModel: CourseData): firebase.Promise<any> {
        const courseUpdate = this.afData.list('courses/').update( model.uid, model );
        const addTeachers = model.teachers
            .filter( (teacher) => originalModel.teachers.findIndex( t => t.uid === teacher.uid ) === -1 );
        const removeTeachers = originalModel.teachers
            .filter( (teacher) => model.teachers.findIndex( t => t.uid === teacher.uid ) === -1 );
        const teachersUpdate = [];
        addTeachers.forEach( (teacher) => {
            teachersUpdate.push( this.teachersService
                .getById( teacher.uid )
                .then( (dbTeacher) => {
                    if (!dbTeacher.courses || dbTeacher.courses.findIndex( el => el.uid === model.uid ) === -1 ) {
                        dbTeacher.courses = dbTeacher.courses || [];
                        const courseData: any = new ShortUserData( model );
                        courseData.schoolYears = model.schoolYears;
                        dbTeacher.courses.push( courseData );
                    }
                    return dbTeacher;
                })
                .then( (dbTeacher) => {
                    return this.teachersService.update( dbTeacher );
                })
            );
        });
        removeTeachers.forEach( (teacher) => {
            teachersUpdate.push( this.teachersService
                .getById( teacher.uid )
                .then( (dbTeacher) => {
                    const index = dbTeacher.courses.findIndex( el => el.uid === model.uid );
                    if (  index !== -1 ) {
                        dbTeacher.courses.splice( index, 1 );
                    }
                    return dbTeacher;
                })
                .then( (dbTeacher) => {
                    return this.teachersService.update( dbTeacher );
                })
            );
        });
        return Promise.all( [courseUpdate, Promise.all( teachersUpdate )]);
    }

}
