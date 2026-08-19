import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagementAdd } from './vendor-management-add';

describe('VendorManagementAdd', () => {
  let component: VendorManagementAdd;
  let fixture: ComponentFixture<VendorManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
