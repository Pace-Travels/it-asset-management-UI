import { TestBed } from '@angular/core/testing';

import { InternetManagementServices } from './internet-management.services';

describe('InternetManagementServices', () => {
  let service: InternetManagementServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternetManagementServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
