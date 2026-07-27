import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRechargeStatusEdit } from './mobile-recharge-status-edit';

describe('MobileRechargeStatusEdit', () => {
  let component: MobileRechargeStatusEdit;
  let fixture: ComponentFixture<MobileRechargeStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRechargeStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
