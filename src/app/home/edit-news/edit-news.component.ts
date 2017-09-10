import { NewsArticle } from './../../shared/models/news-article';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { NewsService } from './../../core/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'dschool-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit, OnDestroy {
  private key: string;
  private sub: any;
  private article: NewsArticle;
  public addNewsForm: FormGroup;
    constructor(
      private newsService: NewsService,
      private toasterService: ToasterService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
    onSubmit() {
      this.article.content = this.addNewsForm.controls['content'].value;
      this.article.title = this.addNewsForm.controls['title'].value;
      this.newsService.update(this.key, this.article);
      this.toasterService.pop('success', 'The Article is updated');
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
      this.sub = this.route.params.subscribe(params => {
        this.key = params['id'];
        this.article = this.newsService.getById(this.key);
        const title = new FormControl(this.article.title, Validators.required);
        const content = new FormControl(this.article.content, Validators.required);
        this.addNewsForm = new FormGroup({
          title: title,
          content: content
        });
        console.log(this.addNewsForm);
     });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}
