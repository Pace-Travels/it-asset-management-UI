import { TestBed } from '@angular/core/testing';

import { SubscriptionReminderType } from './subscription-reminder-type';

describe('SubscriptionReminderType', () => {
  let service: SubscriptionReminderType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionReminderType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
