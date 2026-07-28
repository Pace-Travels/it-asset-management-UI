import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountStatusEdit } from './email-account-status-edit';

describe('EmailAccountStatusEdit', () => {
  let component: EmailAccountStatusEdit;
  let fixture: ComponentFixture<EmailAccountStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
