import { AngularFireDatabase } from 'angularfire2/database';
import { NewsArticle } from './../shared/models/news-article';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsServiceService {

  constructor(private afData: AngularFireDatabase) { }

  createNews(model: NewsArticle){
    return this.afData.list('news/').push(model);
  }
}
