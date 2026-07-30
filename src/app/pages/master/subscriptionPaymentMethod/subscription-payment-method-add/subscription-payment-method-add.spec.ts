import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentMethodAdd } from './subscription-payment-method-add';

describe('SubscriptionPaymentMethodAdd', () => {
  let component: SubscriptionPaymentMethodAdd;
  let fixture: ComponentFixture<SubscriptionPaymentMethodAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPaymentMethodAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionPaymentMethodAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
