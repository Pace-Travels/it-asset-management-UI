import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalReminderTypeAdd } from './renewal-reminder-type-add';

describe('RenewalReminderTypeAdd', () => {
  let component: RenewalReminderTypeAdd;
  let fixture: ComponentFixture<RenewalReminderTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewalReminderTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewalReminderTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
