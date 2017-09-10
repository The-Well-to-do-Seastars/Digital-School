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
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../../test/router-stubs';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';


import { HomeComponent } from './home.component';
import { TimeAgoPipe } from 'time-ago-pipe/time-ago-pipe';


class RouterStub {
  navigateByUrl(url: string) { return url; }
}

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), RouterTestingModule ],
      declarations: [ HomeComponent, TimeAgoPipe ],
      providers: [UserService, NewsService, AngularFireDatabase, AngularFireAuth ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', inject([Router], (router: Router)  => {
    expect(component).toBeTruthy();
  }));
});
