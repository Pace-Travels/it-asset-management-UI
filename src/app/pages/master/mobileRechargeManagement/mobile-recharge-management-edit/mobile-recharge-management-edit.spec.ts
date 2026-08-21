import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeManagementEdit } from './mobile-recharge-management-edit';

describe('MobileRechargeManagementEdit', () => {
  let component: MobileRechargeManagementEdit;
  let fixture: ComponentFixture<MobileRechargeManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
