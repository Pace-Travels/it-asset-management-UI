import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeStatusAdd } from './mobile-recharge-status-add';

describe('MobileRechargeStatusAdd', () => {
  let component: MobileRechargeStatusAdd;
  let fixture: ComponentFixture<MobileRechargeStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
