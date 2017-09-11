import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from './../core/user.service';

@Injectable()
export class MessageService {
  messages = [
    {id: 1, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaa', shouldDisplay: true, isRead: false},
    {id: 2, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbb', shouldDisplay: true, isRead: false},
    {id: 3, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'ccccccc', shouldDisplay: true, isRead: false},
    {id: 4, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'ddddddd', shouldDisplay: true, isRead: false},
    {id: 5, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaa', shouldDisplay: true, isRead: false},
    {id: 6, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbb', shouldDisplay: true, isRead: false},
    {id: 7, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'ccccccc', shouldDisplay: true, isRead: false},
    {id: 8, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'dddddddd', shouldDisplay: true, isRead: false}
  ];

  currentUser;
  path;
  constructor(
    private userService: UserService,
    private afData: AngularFireDatabase) {
      this.currentUser = this.userService.currentUser;
  }

  sendMessage(model) {
    this.path = 'messages/' + this.currentUser.uid;
    //return this.afData.list(this.path).push(model);
  }

  getCurrUserEmail() {
    return this.currentUser.email;
  }

  getAllMessages() {
    return this.messages;
  }

  remove(msg) {
    this.messages = this.messages.filter(x => x.id !== msg.id);
  }

  getMsg(id) {
    return this.messages.find(x => x.id === id);
  }
}
