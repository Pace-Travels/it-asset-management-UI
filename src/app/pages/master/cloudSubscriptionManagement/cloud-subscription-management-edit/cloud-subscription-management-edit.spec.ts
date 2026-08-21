import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionManagementEdit } from './cloud-subscription-management-edit';

describe('CloudSubscriptionManagementEdit', () => {
  let component: CloudSubscriptionManagementEdit;
  let fixture: ComponentFixture<CloudSubscriptionManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
