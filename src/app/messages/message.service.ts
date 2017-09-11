import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from './../core/user.service';
import * as firebase from 'firebase/app';

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
    this.path = 'messages';
    return this.afData.list(this.path).push(model);
  }

  getCurrUserEmail() {
    return this.currentUser.email;
  }

  getCurrUserUid() {
    return this.currentUser.uid;
  }

  getAllMessages(uid): firebase.Promise<any> {
    const path = 'messages/' + uid;
    console.log( path );
    return firebase.database().ref(path).once('value')
      .then((snapshot) => {
        const messages = [];
        snapshot.forEach((child) => {
          const msg = child.val();
          msg.uid = child.key;
          messages.push(msg);
        });
        return Promise.resolve( messages );
      });
    // return this.msgs;
    // return this.messages;
  }

  getReceiverUser(email, model) {
    //   firebase.database().ref('users').once('value')
    //   .then( (snapshot) => {
    //   snapshot.forEach( (child) => {
    //   const user = child.val();
    //   this.sendMessage(model, user.uid);
    //   // if (user.email === email) {
    //   //   this.receiverUser = user.uid;
    //   //   this.sendMessage(model, user.uid);
    //   // }
    //   });
    // });
  }

  remove(msg) {
    // this.messages = this.messages.filter(x => x.id !== msg.id);
  }

  getMsg(id) {
    // return this.messages.find(x => x.id === id);
  }
}
