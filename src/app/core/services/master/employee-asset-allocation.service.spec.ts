import { TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocationService } from './employee-asset-allocation.service';

describe('EmployeeAssetAllocationService', () => {
  let service: EmployeeAssetAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAssetAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
