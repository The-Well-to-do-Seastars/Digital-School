import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultySelectLineComponent } from './multy-select-line.component';

describe('MultySelectLineComponent', () => {
  let component: MultySelectLineComponent;
  let fixture: ComponentFixture<MultySelectLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultySelectLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultySelectLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
