import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSelectComponent } from './name-select.component';

describe('NameSelectComponent', () => {
  let component: NameSelectComponent;
  let fixture: ComponentFixture<NameSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
