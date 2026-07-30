import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionReminderTypeEdit } from './subscription-reminder-type-edit';

describe('SubscriptionReminderTypeEdit', () => {
  let component: SubscriptionReminderTypeEdit;
  let fixture: ComponentFixture<SubscriptionReminderTypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionReminderTypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionReminderTypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
