import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainWebsiteManagementAdd } from './domain-website-management-add';

describe('DomainWebsiteManagementAdd', () => {
  let component: DomainWebsiteManagementAdd;
  let fixture: ComponentFixture<DomainWebsiteManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainWebsiteManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainWebsiteManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
