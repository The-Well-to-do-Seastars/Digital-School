import { AngularFireDatabase } from 'angularfire2/database';
import { element } from 'protractor';
import { UserData, LoginData } from './../shared/models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

let count = 0;

@Injectable()
export class UserService {

  _currentUser = new UserData();
  afAuthUser;
  subscriptions: Array<Subscription> = [];
  loggedIn: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase
  ) {
      console.log('refresh' + count++);
      this.afAuth.auth.onAuthStateChanged((user) => {
      this.loggedIn = user !== null;
      if (user) {
        this._currentUser.email = user.email;
        const userDetails = this.afData.list('users/', { query: { orderByChild: 'userID', equalTo: user.uid } });
        const newSubscription = userDetails.subscribe((snapshot) => {
          this._currentUser = UserData.fromModel(snapshot[0], this._currentUser);
          newSubscription.unsubscribe();
        });
      } else {
        this._currentUser = new UserData();
      }
    });
  }

  login(login: LoginData): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  logout(): firebase.Promise<any> {
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
    return this._currentUser;
  }

  updateUserInfo(user: UserData): firebase.Promise<any> {
    return this.afData.list('/users', { query: { uid: user.userID } }).update(user.uid, user);
  }

  checkRole(): firebase.Promise<any> {
    console.log(firebase.auth().app);
    const userUid = firebase.auth().currentUser.uid;
    const userQuery = firebase.database().ref('users').orderByChild('userId').equalTo(userUid);
    return userQuery.once('value')
              .then( (snapshot) => {
                  snapshot.forEach( (child) => {
                    const childData = child.val();
                    return child.role.valueOf();
                  });
              });
  }

}
