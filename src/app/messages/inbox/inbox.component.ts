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

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getAllMessages();
  }

  ngDoCheck() {
    this.messages = this.messageService.getAllMessages();
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
