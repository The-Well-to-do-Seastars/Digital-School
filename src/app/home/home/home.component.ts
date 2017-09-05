import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'dschool-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   news: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.news = db.list('/news');
  }
}
