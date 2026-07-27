import { TestBed } from '@angular/core/testing';

import { MobileRechargeStatusService } from './mobile-recharge-status.service';

describe('MobileRechargeStatusService', () => {
  let service: MobileRechargeStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileRechargeStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
