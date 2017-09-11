import { By } from '@angular/platform-browser';
import { NewsArticle } from './../../shared/models/news-article';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { UserService } from './../../core/user.service';
import { NewsService } from './../../core/news.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { EditNewsComponent } from './edit-news.component';
import { tick } from "@angular/core/testing";

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

fdescribe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;
  let newsService: NewsService;
  let userService: UserService;
  let de: DebugElement;
  let toasterService: ToasterService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), ReactiveFormsModule, FormsModule, RouterTestingModule ],
      declarations: [ EditNewsComponent ],
      providers: [
        UserService,
        NewsService,
        AngularFireDatabase,
        AngularFireAuth,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } },
        ToasterService,
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EditNewsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.get(NewsService);
    userService = TestBed.get(UserService);
    toasterService = TestBed.get(ToasterService);
    de = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('calls news service get by Id', () => {
    const article = new NewsArticle();
    spyOn(newsService, 'getById').and.returnValue(article);
    fixture.detectChanges();
    expect(newsService.getById).toHaveBeenCalled();
  });

  it('creates input with name title', () => {
    const article = new NewsArticle();
    spyOn(newsService, 'getById').and.returnValue(article);
    fixture.detectChanges();

    const input = de.query(By.css('input[name=title]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('creates textarea with name content', () => {
    const article = new NewsArticle();
    spyOn(newsService, 'getById').and.returnValue(article);
    fixture.detectChanges();

    const input = de.query(By.css('textarea[name=content]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('creates textarea with name content', () => {
    const article = new NewsArticle();
    spyOn(newsService, 'getById').and.returnValue(article);
    fixture.detectChanges();

    const input = de.query(By.css('textarea[name=content]')).nativeElement;
    expect(input).toBeTruthy();
  });

  it('calls news service update', () => {
    const article = new NewsArticle();
    spyOn(newsService, 'getById').and.returnValue(article);
    spyOn(newsService, 'update');

    const title = new FormControl('this.article.title', Validators.required);
    const content = new FormControl('his.article.content', Validators.required);
    this.addNewsForm = new FormGroup({
      title: title,
      content: content
    });

    fixture.whenStable().then(() => {
      component.onSubmit();
      expect(newsService.update).toHaveBeenCalled();
  });
  });
});
