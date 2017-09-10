import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages = [
    {id: 1, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa', display: true, isRead: false},
    {id: 2, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb', display: true, isRead: false},
    {id: 3, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'cccccccccccc', display: true, isRead: false},
    {id: 4, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'ddddddddddddd', display: true, isRead: false},
    {id: 5, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa', display: true, isRead: false},
    {id: 6, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb', display: true, isRead: false},
    {id: 7, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'cccccccccccc', display: true, isRead: false},
    {id: 8, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'ddddddddddddd', display: true, isRead: false},
    {id: 9, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa', display: true, isRead: false},
    {id: 10, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb', display: true, isRead: false},
    {id: 11, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'cccccccccccc', display: true, isRead: false},
    {id: 12, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'dddddddddddd', display: true, isRead: false},
    {id: 13, author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa', display: true, isRead: false},
    {id: 14, author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb', display: true, isRead: false},
    {id: 15, author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'cccccccccccc', display: true, isRead: false},
    {id: 16, author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'ddddddddddddd', display: true, isRead: false}
  ];

  constructor() { }

  getAllMessages() {
    return this.messages;
  }

  remove(msg) {
    this.messages = this.messages.filter(x => x.title !== msg.title);
  }

  showMsg(id) {
    return this.messages.find(x => x.id === id);
  }
}
