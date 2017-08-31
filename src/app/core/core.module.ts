import { UserService } from './user.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    UserService,
    AngularFireDatabase,
    AngularFireAuth,
  ]
})
export class CoreModule {

  constructor ( @Optional() @SkipSelf() parent: CoreModule ) {
    if (parent) {
      throw new Error('Core module is already provided');
    }
  }
 }
