import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalReminderTypeEdit } from './renewal-reminder-type-edit';

describe('RenewalReminderTypeEdit', () => {
  let component: RenewalReminderTypeEdit;
  let fixture: ComponentFixture<RenewalReminderTypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewalReminderTypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewalReminderTypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
