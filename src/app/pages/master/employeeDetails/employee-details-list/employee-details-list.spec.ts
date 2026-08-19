import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsList } from './employee-details-list';

describe('EmployeeDetailsList', () => {
  let component: EmployeeDetailsList;
  let fixture: ComponentFixture<EmployeeDetailsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
