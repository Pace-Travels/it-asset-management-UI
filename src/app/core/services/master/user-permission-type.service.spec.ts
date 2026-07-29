import { TestBed } from '@angular/core/testing';

import { UserPermissionTypeService } from './user-permission-type.service';

describe('UserPermissionTypeService', () => {
  let service: UserPermissionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPermissionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
