import { MessageModule } from './messages/message.module';
import { StaticComponentsModule } from './static-components/static-components.module';
import { NotfoundComponent } from './static-components/notfound/notfound.component';
import { AngularFireAuth } from 'angularfire2/auth';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    CoreModule,
    CommonModule,
    StaticComponentsModule,
    MessageModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
