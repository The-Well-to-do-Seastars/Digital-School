import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NewsArticle } from './../shared/models/news-article';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  constructor(private afData: AngularFireDatabase) { }

  createNews(model) {
    return this.afData.list('news/').push(model);
  }

  getAll(): any {
    const news = [];
    this.afData.list('news/').subscribe((snapshot) => {
      snapshot.forEach((element) => {
        news.push(element);
      });
    });

    return news;
  }

  getById(id: string): NewsArticle {
    let article;
    const dbArticle = this.afData.object('news/' + id);
    dbArticle.subscribe(item => {
      article =  NewsArticle.fromModel(item, new NewsArticle());
    });

    return article;
  }

  update(key: string, article: NewsArticle) {
    return this.afData.list('/news').update(key, article);
  }
}
