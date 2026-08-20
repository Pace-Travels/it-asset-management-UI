import { TestBed } from '@angular/core/testing';

import { EmailAccountManagementService } from './email-account-management.service';

describe('EmailAccountManagementService', () => {
  let service: EmailAccountManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailAccountManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
