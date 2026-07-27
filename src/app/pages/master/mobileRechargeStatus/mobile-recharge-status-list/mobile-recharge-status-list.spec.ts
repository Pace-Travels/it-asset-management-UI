import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeStatusList } from './mobile-recharge-status-list';

describe('MobileRechargeStatusList', () => {
  let component: MobileRechargeStatusList;
  let fixture: ComponentFixture<MobileRechargeStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
