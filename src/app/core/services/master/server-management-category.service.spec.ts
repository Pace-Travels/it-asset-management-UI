import { TestBed } from '@angular/core/testing';

import { ServerManagementCategoryService } from './server-management-category.service';

describe('ServerManagementCategoryService', () => {
  let service: ServerManagementCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerManagementCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
