import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionServiceList } from './cloud-subscription-service-list';

describe('CloudSubscriptionServiceList', () => {
  let component: CloudSubscriptionServiceList;
  let fixture: ComponentFixture<CloudSubscriptionServiceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionServiceList],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionServiceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
