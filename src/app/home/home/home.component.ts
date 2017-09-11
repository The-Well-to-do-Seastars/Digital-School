import { UserService } from './../../core/user.service';
import { UserData } from './../../shared/models/user';
import { element } from 'protractor';
import { NewsArticle } from './../../shared/models/news-article';
import { NewsService } from './../../core/news.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'dschool-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: UserData;
  public news: NewsArticle[];
  private newsService: NewsService;

  private userService: UserService;

  constructor(newsService: NewsService, userService: UserService) {
    this.newsService = newsService;
    this.userService = userService;
  }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.news = [];
    this.newsService.getAll().subscribe((snapshot) => {
      snapshot.forEach(elem => {
        this.news.push(elem);
      });
    });
  }
}
