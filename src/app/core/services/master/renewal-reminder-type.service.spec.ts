import { TestBed } from '@angular/core/testing';

import { RenewalReminderTypeService } from './renewal-reminder-type.service';

describe('RenewalReminderTypeService', () => {
  let service: RenewalReminderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenewalReminderTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
