import { TestBed, inject } from '@angular/core/testing';

import { TeacherGuardService } from './teacher-guard.service';

describe('AdminTeacherGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherGuardService]
    });
  });

  it('should be created', inject([TeacherGuardService], (service: TeacherGuardService) => {
    expect(service).toBeTruthy();
  }));
});
