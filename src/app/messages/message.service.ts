import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages = [
    {author: 'author1', to: 'receiver1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa'},
    {author: 'author1', to: 'receiver2', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb'},
    {author: 'author2', to: 'receiver3', title: 'title3', date: '10.9.2017', content: 'cccccccccccc'},
    {author: 'author3', to: 'receiver4', title: 'title4', date: '10.9.2017', content: 'ddddddddddddddd'}
  ];

  constructor() { }

  getAllMessages() {
    return this.messages;
  }

  remove(msg) {
    console.log(msg);
    this.messages = this.messages.filter(x => x.title !== msg.title);
  }
}
