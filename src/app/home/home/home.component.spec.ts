import { UserData } from './../../shared/models/user';
import 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditNewsComponent } from './../edit-news/edit-news.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeModule } from './../home.module';
import { HomeRoutingModule } from './../home-routing.module';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from './../../core/news.service';
import { UserService } from './../../core/user.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';


import { HomeComponent } from './home.component';
import { TimeAgoPipe } from 'time-ago-pipe/time-ago-pipe';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


class RouterStub {
  navigateByUrl(url: string) { return url; }
}

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let newsService: NewsService;
  let userService: UserService;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), RouterTestingModule ],
      declarations: [ HomeComponent, TimeAgoPipe ],
      providers: [UserService, NewsService, AngularFireDatabase, AngularFireAuth ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    newsService = TestBed.get(NewsService);
    userService = TestBed.get(UserService);
    de = fixture.debugElement;
  });

  it('should be created', ()  => {
    expect(component).toBeTruthy();
  });

  it('should call getAll on news service', ()  => {
    spyOn(newsService, 'getAll');

    fixture.detectChanges();
    expect(newsService.getAll).toHaveBeenCalled();
  });

  it('should call current user on user service', ()  => {
    const user = new UserData();
    spyOn(userService, 'currentUser').and.returnValue(user);

    fixture.detectChanges();
    expect(userService.currentUser).toEqual(user);
  });

  it('should show title news 1 article', ()  => {
    spyOn(newsService, 'getAll').and.returnValue([
      {
        'content' : 'aaaa',
        'createdOn' : 1504897663527,
        'isHidden' : false,
        'title' : 'New test'
      }
    ]);

    fixture.detectChanges();
    const article = de.query(By.css('.media-heading')).nativeElement;
    expect(article.textContent).toEqual('New test');
  });

  it('should show title news 1 article', ()  => {
    spyOn(newsService, 'getAll').and.returnValue([
      {
        'content' : 'aaaa',
        'createdOn' : 1504897663527,
        'isHidden' : false,
        'title' : 'New test'
      }
    ]);

    fixture.detectChanges();
    const article = de.query(By.css('.media-body p')).nativeElement;
    expect(article.textContent).toEqual('aaaa');
  });

  it('should show news several article', ()  => {
    spyOn(newsService, 'getAll').and.returnValue([
      {
        'content' : 'aaaa',
        'createdOn' : 1504897663527,
        'isHidden' : false,
        'title' : 'New test'
      },
      {
        'content' : 'aaaa',
        'createdOn' : 1504897663527,
        'isHidden' : false,
        'title' : 'New test1'
      },
      {
        'content' : 'aaaa',
        'createdOn' : 1504897663527,
        'isHidden' : false,
        'title' : 'New test2'
      }
    ]);

    fixture.detectChanges();
    const result = fixture.nativeElement.querySelectorAll('.media-heading');
    expect(result[0].textContent).toEqual('New test');
    expect(result[1].textContent).toEqual('New test1');
    expect(result[2].textContent).toEqual('New test2');
  });
});
