import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInformationCategoryAdd } from './asset-information-category-add';

describe('AssetInformationCategoryAdd', () => {
  let component: AssetInformationCategoryAdd;
  let fixture: ComponentFixture<AssetInformationCategoryAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetInformationCategoryAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetInformationCategoryAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
