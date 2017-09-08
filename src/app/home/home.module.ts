import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditNewsComponent } from './edit-news/edit-news.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomeComponent, AddNewsComponent, EditNewsComponent],
})
export class HomeModule { }
