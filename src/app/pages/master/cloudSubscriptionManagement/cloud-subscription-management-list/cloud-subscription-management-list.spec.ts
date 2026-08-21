import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSubscriptionManagementList } from './cloud-subscription-management-list';

describe('CloudSubscriptionManagementList', () => {
  let component: CloudSubscriptionManagementList;
  let fixture: ComponentFixture<CloudSubscriptionManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSubscriptionManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSubscriptionManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
