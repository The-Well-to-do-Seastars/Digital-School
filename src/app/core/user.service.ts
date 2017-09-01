import { AngularFireDatabase } from 'angularfire2/database';
import { element } from 'protractor';
import { UserData, LoginData } from './../shared/models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UserService {

  _currentUser = new UserData();
  subscriptions: Array<Subscription> = [];
  loggedIn: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase
  ) {
    //this.user = afAuth.authState;
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.loggedIn = user !== null;
      const temp = this.currentUser;
    });
  }

  login(login: LoginData): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  logout(): firebase.Promise<any> {
    this.subscriptions.forEach( (subscription) => subscription.unsubscribe() );
    return this.afAuth.auth.signOut();
  }

  register(data: LoginData) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(({ uid, email }) => {
        return Promise.all([this.afData.list('/users'), { uid, email }]);
      })
      .then(([users, details]) => {
        const newUser = new UserData(details.uid, details.email);
        return users.push(newUser);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  get currentUser(): UserData {
    const fbUser = this.afAuth.auth.currentUser;
    if (fbUser) {
      this._currentUser.email = fbUser.email;
      const userDetails = this.afData.list('users/', { query: { orderByChild: 'userID', equalTo: fbUser.uid } });
      const newSubscription = userDetails.subscribe((snapshot) => {
        this._currentUser = UserData.fromModel( snapshot[0], this._currentUser );
      });
      this.subscriptions.push( newSubscription );
    } else {
      this._currentUser = new UserData();
    }
    return this._currentUser;
  }

  updateUserInfo(user: UserData): firebase.Promise<any> {
    return this.afData.list('/users', { query: { uid: user.userID } }).update(user.uid, user);
  }

}
