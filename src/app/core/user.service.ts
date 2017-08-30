import { LoginData } from './../shared/models/login';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(login: LoginData ): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword( login.email, login.password );
  }

  logout(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  register(data: LoginData) {
    return this.afAuth.auth.createUserWithEmailAndPassword( data.email, data.password );
  }

}
