import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeEdit } from './admin-type-edit';

describe('AdminTypeEdit', () => {
  let component: AdminTypeEdit;
  let fixture: ComponentFixture<AdminTypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
