import { ClassDetailsComponent } from './class-details/class-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AdminComponent } from './admin.component';
import { GenerateClassComponent } from './generate-class/generate-class.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassEditComponent } from './class-edit/class-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'class', children: [
      { path: 'create', component: GenerateClassComponent },
      { path: 'edit', component: ClassEditComponent },
      { path: 'edit/:uid', component: ClassDetailsComponent }
  ]},
  { path: 'home', component: AdminComponent },
  { path: 'course', children: [
    { path: 'create', component: CreateCourseComponent },
    { path: 'edit', component: EditCourseComponent },
    { path: 'edit/:uid', component: CourseDetailsComponent },
  ]},
  { path: 'teacher', children: [
    { path: 'edit', component: TeacherEditComponent },
    { path: 'edit/:uid', component: TeacherDetailsComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
