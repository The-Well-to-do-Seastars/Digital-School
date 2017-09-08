import { Roles, Classes } from '../enums';
import { isArray } from './../utils/isArray';
export class UserData {
  public firstName: string;
  public lastName: string;
  public addmissionYear: number;
  public class_number: Classes;
  public shoolYear: number;
  public role: Roles;
  public uid: string;
  constructor(
    public userID: string = '',
    public email: string = '',

  ) {
    this.uid = '';
    this.firstName = '';
    this.lastName = '';
    this.addmissionYear = new Date().getFullYear();
    this.class_number = Classes.a;
    this.role = Roles.student;
    this.shoolYear = 0;
  }

  get displayName(): string {
    return (this.firstName && this.lastName) ? `${this.firstName} ${this.lastName}` : this.email;
  }

  static fromModel(model, target?: UserData): UserData {
    const user = target || new UserData();
    for (const prop in user) {
      if (user.hasOwnProperty(prop)) {
        user[prop] = model[prop];
      }
    }
    user.uid = model.$key || model.uid;
    return user;
  }

}

export class ShortUserData {
  name: string;
  uid: string;

  constructor(model?) {
    if (model) {
      this.name = model.name;
      this.uid = model.uid;
    }
  }
  static fromModel(model: UserData) {
    const user = new ShortUserData();
    user.name = model.displayName;
    user.uid = model.uid;
    return user;
  }
}

export class ShortListUserData extends ShortUserData {
  include: boolean;

  constructor(user: ShortUserData, includeDefault = true) {
    super();
    this.name = user.name;
    this.uid = user.uid;
    this.include = includeDefault;
  }
}
export class TeacherData extends UserData {
  courses: Array<ShortUserData>;
  constructor() {
    super();
    this.courses = [];
  }

  static fromModel(model, target?: TeacherData): TeacherData {
    const teacher = target || new TeacherData();
    for (const prop in teacher) {
      if (teacher.hasOwnProperty(prop)) {
        teacher[prop] = model[prop];
        if (isArray(teacher[prop])) {
          teacher[prop] = teacher[prop].slice();
        }
      }
    }
    teacher.uid = model.$key || model.uid;
    return teacher;
  }
}
