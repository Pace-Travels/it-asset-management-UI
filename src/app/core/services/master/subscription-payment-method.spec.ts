import { TestBed } from '@angular/core/testing';

import { SubscriptionPaymentMethod } from './subscription-payment-method';

describe('SubscriptionPaymentMethod', () => {
  let service: SubscriptionPaymentMethod;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionPaymentMethod);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
