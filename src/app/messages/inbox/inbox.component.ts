import { MessageData } from './../../shared/models/message';
import { FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { MessageService } from './../message.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'dschool-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, DoCheck {
  shouldDisplayNewMsg = true;
  messages;
  currentMsg = {};
  model;

  id: string;
  from: string;
  to: string;
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  shouldDisplay: boolean;
  isRead: boolean;

  constructor(
    private messageService: MessageService,
    private toasterService: ToasterService) {
     }

  ngOnInit() {
    this.messageService
      .getAllMessages( this.messageService.getCurrUserUid() )
      .then( (messages) => {
        this.messages = messages;
        console.log( messages );
      });
  }

  ngDoCheck() {
    // this.messageService
    // .getAllMessages( this.messageService.getCurrUserUid() )
    // .then( (messages) => {
    //   this.messages = messages;
    // });
  }

 createMsg() {
    this.from = this.messageService.getCurrUserEmail();
    this.model = new MessageData(0, this.from, this.to, this.title, this.content);
    console.log('Title ' + this.model.title);
    console.log('Content ' + this.model.content);
    console.log('To ' + this.model.to);
    console.log('First name ' + this.model.firstName);
    console.log('Last name ' + this.model.lastName);
    console.log('From ' + this.model.from);
    console.log('Date ' + this.model.date);
    console.log('Display ' + this.model.shouldDisplay);
    console.log('IsReadable ' + this.model.isRead);

    this.messageService.sendMessage(this.model, '');
    // this.messageService.getReceiverUser(this.model.to, this.model);
  }

  remove(msg) {
    this.shouldDisplayNewMsg = true;
    this.messageService.remove(msg);
  }

  getMsg(uid) {
    this.shouldDisplayNewMsg = false;
    this.currentMsg = this.messages.find( el => el.uid === uid );
  }

  newMsg() {
    this.shouldDisplayNewMsg = true;
  }
}
