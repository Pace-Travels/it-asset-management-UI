import { TestBed } from '@angular/core/testing';

import { MonitoringBackupStatusService } from './monitoring-backup-status.service';

describe('MonitoringBackupStatusService', () => {
  let service: MonitoringBackupStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringBackupStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
