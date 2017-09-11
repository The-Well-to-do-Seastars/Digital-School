import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from './../core/user.service';
import * as firebase from 'firebase/app';
import { UserData, ShortUserData } from '../shared/models';

@Injectable()
export class MessageService {

  msgs = [];
  receiverUser;
  currentUser;
  path;
  constructor(
    private userService: UserService,
    private afData: AngularFireDatabase) {
    this.currentUser = this.userService.currentUser;
  }

  sendMessage(model, receiverUid) {
    this.path = 'messages/' + model.to;
    return this.afData.list(this.path).push(model);
  }

  getCurrUserEmail() {
    return this.currentUser.email;
  }

  getCurrUserUid() {
    return this.currentUser.uid;
  }

  getAllMessages(uid): firebase.Promise<any> {
    const path = '/messages/' + uid;
    return firebase.database().ref(path).once('value')
      .then((snapshot) => {
        const messages = [];
        snapshot.forEach((child) => {
          const msg = child.val();
          msg.uid = child.key;
          messages.push(msg);
        });
        return Promise.resolve(messages);
      });
  }

  getReceiverUsers(): firebase.Promise<any> {
    return firebase.database().ref('users').once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((child) => {
          const user = ShortUserData.fromModel( UserData.fromModel( child.val() ));
          user.uid = child.key;
          users.push( user );
        });
        return Promise.resolve( users );
      });
  }

  remove(msg) {
    const path = '/messages/' + msg.to;
    return this.afData.list( path ).remove( msg.uid );
  }

  getMsg(id) {
    // return this.messages.find(x => x.id === id);
  }
}
