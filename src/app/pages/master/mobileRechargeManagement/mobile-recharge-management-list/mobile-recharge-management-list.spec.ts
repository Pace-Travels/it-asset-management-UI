import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeManagementList } from './mobile-recharge-management-list';

describe('MobileRechargeManagementList', () => {
  let component: MobileRechargeManagementList;
  let fixture: ComponentFixture<MobileRechargeManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
