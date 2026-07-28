import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionServiceEdit } from './cloud-subscription-service-edit';

describe('CloudSubscriptionServiceEdit', () => {
  let component: CloudSubscriptionServiceEdit;
  let fixture: ComponentFixture<CloudSubscriptionServiceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionServiceEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionServiceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
