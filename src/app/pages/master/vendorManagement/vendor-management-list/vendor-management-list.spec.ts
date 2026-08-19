import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagementList } from './vendor-management-list';

describe('VendorManagementList', () => {
  let component: VendorManagementList;
  let fixture: ComponentFixture<VendorManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
