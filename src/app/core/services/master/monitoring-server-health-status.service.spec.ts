import { TestBed } from '@angular/core/testing';

import { MonitoringServerHealthStatusService } from './monitoring-server-health-status.service';

describe('MonitoringServerHealthStatusService', () => {
  let service: MonitoringServerHealthStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringServerHealthStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
