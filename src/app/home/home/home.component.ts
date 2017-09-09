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
  private newsService: NewsService;
  public news: FirebaseListObservable<any[]>;
  public tnews: NewsArticle[];

  constructor(newsService: NewsService) {
    this.newsService = newsService;
  }

  ngOnInit() {
    this.tnews = [];
    this.news = this.newsService.getAll();
    this.newsService.getAll().subscribe((snapshot) => {
      snapshot.forEach(element => {
        this.tnews.push(element);
      });
    });
    console.log(this.tnews);
  }
}
