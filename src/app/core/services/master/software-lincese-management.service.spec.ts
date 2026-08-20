import { TestBed } from '@angular/core/testing';

import { SoftwareLinceseManagementService } from './software-lincese-management.service';

describe('SoftwareLinceseManagementService', () => {
  let service: SoftwareLinceseManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareLinceseManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
