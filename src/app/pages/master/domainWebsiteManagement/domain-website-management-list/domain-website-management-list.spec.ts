import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainWebsiteManagementList } from './domain-website-management-list';

describe('DomainWebsiteManagementList', () => {
  let component: DomainWebsiteManagementList;
  let fixture: ComponentFixture<DomainWebsiteManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainWebsiteManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainWebsiteManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
