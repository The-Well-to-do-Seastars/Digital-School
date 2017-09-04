import { ShortUserData } from './user';
export class ClassData {
    leadTeacher: ShortUserData;
    students: Array<ShortUserData>;
    constructor() {
    }
    static fromModel(model) {
        const classData = new ClassData();

        classData.leadTeacher = model.leadTeacher;
        classData.students = model.students;
        return classData;
    }
}
