import { TestBed } from '@angular/core/testing';

import { SoftwareLicenseCategoryService } from './software-license-category.service';

describe('SoftwareLicenseCategoryService', () => {
  let service: SoftwareLicenseCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareLicenseCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
