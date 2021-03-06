import { ProfileGuardService } from './guards/profile-guard.service';
import { ScheduleGuardService } from './guards/schedule-guard.service';
import { TeacherGuardService } from './guards/teacher-guard.service';
import { CoursesService } from './courses.service';
import { AdminGuardService } from './guards/admin-guard.service';
import { NewsService } from './news.service';
import { TeachersService } from './teachers.service';
import { StudentsService } from './students.service';
import { ClassesService } from './classes.service';
import { UserService } from './user.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    ToasterService,

    UserService,
    ClassesService,
    StudentsService,
    CoursesService,
    NewsService,

    TeachersService,
    ScheduleGuardService,
    ProfileGuardService,
    AdminGuardService,
    TeacherGuardService
  ]
})
export class CoreModule {

  constructor ( @Optional() @SkipSelf() parent: CoreModule ) {
    if (parent) {
      throw new Error('Core module is already provided');
    }
  }
 }
