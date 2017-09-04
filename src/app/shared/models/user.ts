import { Roles, Classes } from '../enums';
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
    return ( this.firstName && this.lastName ) ? `${this.firstName} ${this.lastName}` : this.email;
  }

  static fromModel( model, target?: UserData ): UserData {
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

  constructor() {
  }
  static fromModel( model: UserData ) {
    const user = new ShortUserData();
    user.name = model.displayName;
    user.uid = model.uid;
    return user;
  }
}
