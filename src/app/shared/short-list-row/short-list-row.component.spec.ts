import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortListRowComponent } from './short-list-row.component';

describe('ShortListRowComponent', () => {
  let component: ShortListRowComponent;
  let fixture: ComponentFixture<ShortListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
