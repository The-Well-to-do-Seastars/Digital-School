import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultySelectComponent } from './multy-select.component';

describe('MultySelectComponent', () => {
  let component: MultySelectComponent;
  let fixture: ComponentFixture<MultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
