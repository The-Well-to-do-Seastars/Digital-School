import { MessageData } from './../../shared/models/message';
import { FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { MessageService } from './../message.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, DoCheck {
  shouldDisplayNewMsg = true;
  messages = [];
  currentMsg = {};
  model;

  id: string;
  from: string;
  to: string;
  title: string;
  content: string;
  shouldDisplay: boolean;
  isRead: boolean;

  constructor(
    private messageService: MessageService,
    private toasterService: ToasterService) {
     }

  ngOnInit() {
    this.messages = this.messageService.getAllMessages();
  }

  ngDoCheck() {
    this.messages = this.messageService.getAllMessages();
  }

 createMsg() {
    this.from = this.messageService.getCurrUserEmail();
    this.model = new MessageData(0, this.from, this.to, this.title, this.content);
    console.log('Title ' + this.model.title);
    console.log('Content ' + this.model.content);
    console.log('To ' + this.model.to);
    console.log('From ' + this.model.from);
    console.log('Date ' + this.model.date);
    console.log('Display ' + this.model.shouldDisplay);
    console.log('IsReadable ' + this.model.isRead);
  }

  remove(msg) {
    this.shouldDisplayNewMsg = true;
    this.messageService.remove(msg);
  }

  getMsg(id) {
    this.shouldDisplayNewMsg = false;
    this.currentMsg = this.messageService.getMsg(id);
  }

  newMsg(){
    this.shouldDisplayNewMsg = true;
  }
}
