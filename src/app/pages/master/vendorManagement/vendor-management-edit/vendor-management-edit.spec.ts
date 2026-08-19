import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagementEdit } from './vendor-management-edit';

describe('VendorManagementEdit', () => {
  let component: VendorManagementEdit;
  let fixture: ComponentFixture<VendorManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
