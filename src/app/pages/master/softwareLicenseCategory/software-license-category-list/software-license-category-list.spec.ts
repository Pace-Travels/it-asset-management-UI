import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseCategoryList } from './software-license-category-list';

describe('SoftwareLicenseCategoryList', () => {
  let component: SoftwareLicenseCategoryList;
  let fixture: ComponentFixture<SoftwareLicenseCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLicenseCategoryList],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLicenseCategoryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
