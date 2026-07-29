import { TestBed } from '@angular/core/testing';

import { AdminStatusService } from './admin-status.service';

describe('AdminStatusService', () => {
  let service: AdminStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
