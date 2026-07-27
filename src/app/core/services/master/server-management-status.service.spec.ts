import { TestBed } from '@angular/core/testing';

import { ServerManagementStatusService } from './server-management-status.service';

describe('ServerManagementStatusService', () => {
  let service: ServerManagementStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerManagementStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
