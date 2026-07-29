import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeList } from './admin-type-list';

describe('AdminTypeList', () => {
  let component: AdminTypeList;
  let fixture: ComponentFixture<AdminTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
