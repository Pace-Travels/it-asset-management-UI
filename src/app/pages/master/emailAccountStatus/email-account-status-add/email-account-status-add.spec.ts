import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountStatusAdd } from './email-account-status-add';

describe('EmailAccountStatusAdd', () => {
  let component: EmailAccountStatusAdd;
  let fixture: ComponentFixture<EmailAccountStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
