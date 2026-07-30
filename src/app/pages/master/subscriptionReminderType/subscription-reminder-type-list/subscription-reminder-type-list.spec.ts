import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionReminderTypeList } from './subscription-reminder-type-list';

describe('SubscriptionReminderTypeList', () => {
  let component: SubscriptionReminderTypeList;
  let fixture: ComponentFixture<SubscriptionReminderTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionReminderTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionReminderTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
