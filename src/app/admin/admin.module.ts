import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GenerateClassComponent } from './generate-class/generate-class.component';
import { AdminComponent } from './admin.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassEditComponent } from './class-edit/class-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    GenerateClassComponent,
    CreateCourseComponent,
    EditCourseComponent,
    CourseDetailsComponent,
    TeacherEditComponent,
    TeacherDetailsComponent,
    ClassDetailsComponent,
    ClassEditComponent
  ]
})
export class AdminModule { }
