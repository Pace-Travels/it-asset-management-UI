import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalReminderTypeList } from './renewal-reminder-type-list';

describe('RenewalReminderTypeList', () => {
  let component: RenewalReminderTypeList;
  let fixture: ComponentFixture<RenewalReminderTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewalReminderTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewalReminderTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
