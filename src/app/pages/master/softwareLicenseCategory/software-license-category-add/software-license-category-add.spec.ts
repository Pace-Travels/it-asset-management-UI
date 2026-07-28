import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseCategoryAdd } from './software-license-category-add';

describe('SoftwareLicenseCategoryAdd', () => {
  let component: SoftwareLicenseCategoryAdd;
  let fixture: ComponentFixture<SoftwareLicenseCategoryAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLicenseCategoryAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLicenseCategoryAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
