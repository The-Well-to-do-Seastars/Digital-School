import { UserService } from './../../core/user.service';
import { MessageData } from './../../shared/models/message';
import { FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { MessageService } from './../message.service';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'dschool-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, DoCheck, OnDestroy {
  shouldDisplayNewMsg = true;
  messages;
  currentMsg = {};
  model;
  users;
  id: string;
  from: string;
  to: string;
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  shouldDisplay: boolean;
  isRead: boolean;
subscription;
  constructor(
    private messageService: MessageService,
    private toasterService: ToasterService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // this.messageService
    //   .getAllMessages(this.messageService.getCurrUserUid())
    //   .then((messages) => {
    //     this.messages = messages;
    //   });
    this.subscription = this.messageService
      .getAllMessages(this.userService.currentUser.uid)
      .subscribe( (snapshot) => this.messages = snapshot );
    this.messageService
      .getReceiverUsers()
      .then((users) => {
        this.users = users;
      });
  }

  ngDoCheck() {
  }

  createMsg() {
    this.from = this.messageService.getCurrUserEmail();
    this.model = new MessageData(0, this.from, this.to, this.title, this.content);
    this.messageService
      .sendMessage(this.model, '')
      .then(() => {
        this.toasterService.pop('success', 'Message successfully sent!');
      })
      .catch((err) => {
        this.toasterService.pop('erro', err.message);
      });
  }

  remove(msg) {
    this.shouldDisplayNewMsg = true;
    this.messageService
      .remove(msg)
      .then(() => {
        this.toasterService.pop('success', 'Message successfully deleted!');
        const index = this.messages.findIndex( message => message === msg );
        this.messages.splice( index, 1 );
      })
      .catch((err) => {
        this.toasterService.pop('erro', err.message);
      });
  }

  getMsg(uid) {
    this.shouldDisplayNewMsg = false;
    this.currentMsg = this.messages.find(el => el.uid === uid);
  }

  newMsg() {
    this.shouldDisplayNewMsg = true;
  }
  userChanged(uid) {
    this.to = uid;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
