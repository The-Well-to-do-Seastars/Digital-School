import { ShortUserData } from './user';
export class CourseData {
    name: string;
    schoolYears: Array<number>;
    teachers: Array<ShortUserData>;
    uid: string;
    constructor() {
        this.name = '';
        this.schoolYears = [];
        this.teachers = [];
    }
    static fromModel( model, target?: CourseData ): CourseData {
        const course = target || new CourseData();
        for (const prop in course) {
          if (course.hasOwnProperty(prop)) {
            course[prop] = model[prop] || course[prop];
          }
        }
        course.uid = model.$key || model.uid;
        return course;
      }
}
