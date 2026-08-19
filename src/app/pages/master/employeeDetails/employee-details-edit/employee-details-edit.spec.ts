import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsEdit } from './employee-details-edit';

describe('EmployeeDetailsEdit', () => {
  let component: EmployeeDetailsEdit;
  let fixture: ComponentFixture<EmployeeDetailsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
