import { TestBed } from '@angular/core/testing';

import { MobileRechargeManagementServices } from './mobile-recharge-management.services';

describe('MobileRechargeManagementServices', () => {
  let service: MobileRechargeManagementServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileRechargeManagementServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
