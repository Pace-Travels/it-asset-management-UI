import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocationList } from './employee-asset-allocation-list';

describe('EmployeeAssetAllocationList', () => {
  let component: EmployeeAssetAllocationList;
  let fixture: ComponentFixture<EmployeeAssetAllocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetAllocationList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAssetAllocationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
