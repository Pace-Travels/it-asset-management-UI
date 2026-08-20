import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocationAdd } from './employee-asset-allocation-add';

describe('EmployeeAssetAllocationAdd', () => {
  let component: EmployeeAssetAllocationAdd;
  let fixture: ComponentFixture<EmployeeAssetAllocationAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetAllocationAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAssetAllocationAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
