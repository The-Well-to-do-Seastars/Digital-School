import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages = [
    {author: 'author1', title: 'title1', date: '9.9.2017', content: 'aaaaaaaaaaaa'},
    {author: 'author1', title: 'title2', date: '9.9.2017', content: 'bbbbbbbbbbbb'}
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
