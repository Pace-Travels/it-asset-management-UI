import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeManagementAdd } from './mobile-recharge-management-add';

describe('MobileRechargeManagementAdd', () => {
  let component: MobileRechargeManagementAdd;
  let fixture: ComponentFixture<MobileRechargeManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
