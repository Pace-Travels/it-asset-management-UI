import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentMethodEdit } from './subscription-payment-method-edit';

describe('SubscriptionPaymentMethodEdit', () => {
  let component: SubscriptionPaymentMethodEdit;
  let fixture: ComponentFixture<SubscriptionPaymentMethodEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPaymentMethodEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionPaymentMethodEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
