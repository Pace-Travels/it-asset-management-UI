import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionAdd } from './subscription-add';

describe('SubscriptionAdd', () => {
  let component: SubscriptionAdd;
  let fixture: ComponentFixture<SubscriptionAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
