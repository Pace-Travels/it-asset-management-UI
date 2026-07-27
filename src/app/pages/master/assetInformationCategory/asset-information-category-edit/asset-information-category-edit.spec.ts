import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInformationCategoryEdit } from './asset-information-category-edit';

describe('AssetInformationCategoryEdit', () => {
  let component: AssetInformationCategoryEdit;
  let fixture: ComponentFixture<AssetInformationCategoryEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetInformationCategoryEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetInformationCategoryEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
