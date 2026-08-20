import { TestBed } from '@angular/core/testing';

import { DomainWebsiteManagementService } from './domain-website-management.service';

describe('DomainWebsiteManagementService', () => {
  let service: DomainWebsiteManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainWebsiteManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
