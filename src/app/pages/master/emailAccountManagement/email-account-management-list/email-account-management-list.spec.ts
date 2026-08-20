import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountManagementList } from './email-account-management-list';

describe('EmailAccountManagementList', () => {
  let component: EmailAccountManagementList;
  let fixture: ComponentFixture<EmailAccountManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
