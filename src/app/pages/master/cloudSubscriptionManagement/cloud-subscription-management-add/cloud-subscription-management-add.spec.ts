import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionManagementAdd } from './cloud-subscription-management-add';

describe('CloudSubscriptionManagementAdd', () => {
  let component: CloudSubscriptionManagementAdd;
  let fixture: ComponentFixture<CloudSubscriptionManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
