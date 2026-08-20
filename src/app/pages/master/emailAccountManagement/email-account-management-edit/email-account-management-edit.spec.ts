import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountManagementEdit } from './email-account-management-edit';

describe('EmailAccountManagementEdit', () => {
  let component: EmailAccountManagementEdit;
  let fixture: ComponentFixture<EmailAccountManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
