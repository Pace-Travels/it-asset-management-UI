import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseCategoryEdit } from './software-license-category-edit';

describe('SoftwareLicenseCategoryEdit', () => {
  let component: SoftwareLicenseCategoryEdit;
  let fixture: ComponentFixture<SoftwareLicenseCategoryEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLicenseCategoryEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLicenseCategoryEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
