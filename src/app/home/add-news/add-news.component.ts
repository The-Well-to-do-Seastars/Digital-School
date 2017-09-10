import { ToasterService } from 'angular2-toaster';
import { NewsArticle } from './../../shared/models/news-article';
import { NewsService } from './../../core/news.service';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dschool-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  public addNewsForm: FormGroup;

  constructor(
    private newsService: NewsService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  onSubmit() {
    const newsArticle: NewsArticle = new NewsArticle();
    newsArticle.content = this.addNewsForm.controls['content'].value;
    newsArticle.title = this.addNewsForm.controls['title'].value;
    this.newsService.createNews(newsArticle);
    this.toasterService.pop('success', 'The Article is posted');
    this.router.navigate(['']);
  }

  showValidationMessades() {
    for (const key in this.addNewsForm.controls) {
      if (this.addNewsForm.controls.hasOwnProperty(key)) {
        this.addNewsForm.controls[key].markAsTouched();
      }
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
