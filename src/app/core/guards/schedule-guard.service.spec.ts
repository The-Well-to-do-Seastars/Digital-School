/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleGuardService } from './schedule-guard.service';

describe('Service: ScheduleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleGuardService]
    });
  });

  it('should ...', inject([ScheduleGuardService], (service: ScheduleGuardService) => {
    expect(service).toBeTruthy();
  }));
});