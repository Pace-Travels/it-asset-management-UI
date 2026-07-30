import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionReminderTypeAdd } from './subscription-reminder-type-add';

describe('SubscriptionReminderTypeAdd', () => {
  let component: SubscriptionReminderTypeAdd;
  let fixture: ComponentFixture<SubscriptionReminderTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionReminderTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionReminderTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
