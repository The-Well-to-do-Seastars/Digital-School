import { ToasterService } from 'angular2-toaster';
import { MessageData } from './../../shared/models/message';
import { MessageService } from './../message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dschool-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
  @Input()
  message;

  // model = new MessageData(0, '', '', '', '', '', true, true);
  // error: any;
  constructor(private toasterService: ToasterService) {
   }

  //  onSubmit(){
  //  }
}
