import { TeacherGuardService } from './../core/guards/teacher-guard.service';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addnews', component: AddNewsComponent, canActivate: [TeacherGuardService] },
  { path: 'editnews/:id', component: EditNewsComponent, canActivate: [TeacherGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
