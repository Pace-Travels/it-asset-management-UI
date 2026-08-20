import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainWebsiteManagementEdit } from './domain-website-management-edit';

describe('DomainWebsiteManagementEdit', () => {
  let component: DomainWebsiteManagementEdit;
  let fixture: ComponentFixture<DomainWebsiteManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainWebsiteManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainWebsiteManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
