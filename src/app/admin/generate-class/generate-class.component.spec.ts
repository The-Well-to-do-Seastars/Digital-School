import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateClassComponent } from './generate-class.component';

describe('GenerateClassComponent', () => {
  let component: GenerateClassComponent;
  let fixture: ComponentFixture<GenerateClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
