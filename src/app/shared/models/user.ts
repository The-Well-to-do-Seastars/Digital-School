import { Roles } from '../enums/roles.enum';

export class UserData {
      constructor(
        public email: string,
        public password: string,

        public FirstName: string,
        public LastName: string,
        public year: number,
        public class_number: number,
        public role: Roles
      ) {  }

    }
