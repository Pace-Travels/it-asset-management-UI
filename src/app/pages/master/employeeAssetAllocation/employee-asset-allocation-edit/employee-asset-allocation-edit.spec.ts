import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocationEdit } from './employee-asset-allocation-edit';

describe('EmployeeAssetAllocationEdit', () => {
  let component: EmployeeAssetAllocationEdit;
  let fixture: ComponentFixture<EmployeeAssetAllocationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetAllocationEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAssetAllocationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
