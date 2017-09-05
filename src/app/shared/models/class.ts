import { ShortUserData } from './user';
import { Classes, SchoolYears } from '../enums';
export class ClassData {
    leadTeacher: ShortUserData;
    students: Array<ShortUserData>;

    schoolYear: number;
    class_name: Classes;
    constructor() {
    }

    get displayName() {
        return `${SchoolYears[this.schoolYear].name}<sup>${Classes[this.class_name]}</sup>`;
    }
    static fromModel(model) {
        const classData = new ClassData();
        classData.class_name = model.class_name;
        classData.schoolYear = model.schoolYear;
        classData.leadTeacher = model.leadTeacher;
        classData.students = model.students;
        return classData;
    }
}
