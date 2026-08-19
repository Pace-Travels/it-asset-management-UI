import { TestBed } from '@angular/core/testing';

import { VendorManagmentService } from './vendor-managment.service';

describe('VendorManagmentService', () => {
  let service: VendorManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
