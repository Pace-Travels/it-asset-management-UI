import { TestBed } from '@angular/core/testing';

import { AssetInformationCategory } from './asset-information-category';

describe('AssetInformationCategory', () => {
  let service: AssetInformationCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetInformationCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
