import { TestBed } from '@angular/core/testing';

import { UserRoleStatusEditService } from './user-role-status-edit.service';

describe('UserRoleStatusEditService', () => {
  let service: UserRoleStatusEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleStatusEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
