import { NewsArticle } from './../../shared/models/news-article';
import { NewsService } from './../../core/news.service';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dschool-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  public addNewsForm: FormGroup;

  constructor(private newsService: NewsService) { }

  onSubmit() {
    const newsArticle: NewsArticle = new NewsArticle();
    newsArticle.content = this.addNewsForm.controls['content'].value;
    newsArticle.title = this.addNewsForm.controls['title'].value;
    newsArticle.createdOn = new Date();
    this.newsService.createNews(newsArticle);
  }

  showValidationMessades() {
    console.log('Here')
    for (var key in this.addNewsForm.controls) {
      this.addNewsForm.controls[key].markAsTouched();
    }
  }
  
  ngOnInit() {
    const title = new FormControl(null, Validators.required);
    const content = new FormControl(null, Validators.required);

    this.addNewsForm = new FormGroup({
      title: title,
      content: content
    });
  }

}
