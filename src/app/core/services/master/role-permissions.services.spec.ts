import { TestBed } from '@angular/core/testing';

import { RolePermissionsServices } from './role-permissions.services';

describe('RolePermissionsServices', () => {
  let service: RolePermissionsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePermissionsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
