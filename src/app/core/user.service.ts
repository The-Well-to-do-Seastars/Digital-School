import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { LoginData } from '../shared/models/login';

@Injectable()
export class UserService {

  user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(login: LoginData ): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword( login.email, login.password);
  }

  logout(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
