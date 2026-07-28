import { TestBed } from '@angular/core/testing';

import { EmailAccountStatusService } from './email-account-status.service';

describe('EmailAccountStatusService', () => {
  let service: EmailAccountStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailAccountStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
