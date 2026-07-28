import { TestBed } from '@angular/core/testing';

import { CloudSubscriptionServiceService } from './cloud-subscription-service.service';

describe('CloudSubscriptionServiceService', () => {
  let service: CloudSubscriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSubscriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
