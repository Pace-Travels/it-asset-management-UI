import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccountStatusList } from './email-account-status-list';

describe('EmailAccountStatusList', () => {
  let component: EmailAccountStatusList;
  let fixture: ComponentFixture<EmailAccountStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAccountStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailAccountStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
