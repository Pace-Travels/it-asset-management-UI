import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInformationCategoryList } from './asset-information-category-list';

describe('AssetInformationCategoryList', () => {
  let component: AssetInformationCategoryList;
  let fixture: ComponentFixture<AssetInformationCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetInformationCategoryList],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetInformationCategoryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
