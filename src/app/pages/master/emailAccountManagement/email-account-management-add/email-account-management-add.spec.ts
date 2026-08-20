import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountManagementAdd } from './email-account-management-add';

describe('EmailAccountManagementAdd', () => {
  let component: EmailAccountManagementAdd;
  let fixture: ComponentFixture<EmailAccountManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
