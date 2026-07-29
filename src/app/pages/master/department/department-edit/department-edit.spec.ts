import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEdit } from './department-edit';

describe('DepartmentEdit', () => {
  let component: DepartmentEdit;
  let fixture: ComponentFixture<DepartmentEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
