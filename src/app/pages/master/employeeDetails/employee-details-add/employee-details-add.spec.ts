import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsAdd } from './employee-details-add';

describe('EmployeeDetailsAdd', () => {
  let component: EmployeeDetailsAdd;
  let fixture: ComponentFixture<EmployeeDetailsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
