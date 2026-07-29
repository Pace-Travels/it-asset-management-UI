import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeAdd } from './admin-type-add';

describe('AdminTypeAdd', () => {
  let component: AdminTypeAdd;
  let fixture: ComponentFixture<AdminTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
