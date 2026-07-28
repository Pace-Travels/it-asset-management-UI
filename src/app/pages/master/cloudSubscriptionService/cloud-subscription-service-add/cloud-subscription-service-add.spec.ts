import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionServiceAdd } from './cloud-subscription-service-add';

describe('CloudSubscriptionServiceAdd', () => {
  let component: CloudSubscriptionServiceAdd;
  let fixture: ComponentFixture<CloudSubscriptionServiceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionServiceAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionServiceAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
