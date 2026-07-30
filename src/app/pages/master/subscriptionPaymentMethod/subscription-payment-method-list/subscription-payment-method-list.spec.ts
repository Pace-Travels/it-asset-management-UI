import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentMethodList } from './subscription-payment-method-list';

describe('SubscriptionPaymentMethodList', () => {
  let component: SubscriptionPaymentMethodList;
  let fixture: ComponentFixture<SubscriptionPaymentMethodList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPaymentMethodList],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionPaymentMethodList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
