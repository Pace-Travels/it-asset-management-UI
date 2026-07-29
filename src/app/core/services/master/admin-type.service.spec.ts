import { TestBed } from '@angular/core/testing';

import { AdminTypeService } from './admin-type.service';

describe('AdminTypeService', () => {
  let service: AdminTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
