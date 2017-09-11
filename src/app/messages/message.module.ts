import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message/message.component';
import { InboxComponent } from './inbox/inbox.component';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ InboxComponent, MessageComponent ],
  providers: [ MessageService ],
  exports: [
  ]
})
export class MessageModule { }
