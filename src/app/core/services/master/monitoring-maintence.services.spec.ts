import { TestBed } from '@angular/core/testing';

import { MonitoringMaintenceServices } from './monitoring-maintence.services';

describe('MonitoringMaintenceServices', () => {
  let service: MonitoringMaintenceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringMaintenceServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
