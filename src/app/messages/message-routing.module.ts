import { InboxComponent } from './inbox/inbox.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full'},
  { path: 'all', component: InboxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
