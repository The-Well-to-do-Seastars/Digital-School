import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NewsArticle } from './../shared/models/news-article';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {

  constructor(private afData: AngularFireDatabase) { }

  createNews(model){
    return this.afData.list('news/').push(model);
  }

  getAll(): FirebaseListObservable<any> {
    return this.afData.list('news/');
  }
}
