import { TestBed } from '@angular/core/testing';

import { CloudSubscriptionManagementServices } from './cloud-subscription-management.services';

describe('CloudSubscriptionManagementServices', () => {
  let service: CloudSubscriptionManagementServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSubscriptionManagementServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
