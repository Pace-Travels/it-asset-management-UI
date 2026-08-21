import { TestBed } from '@angular/core/testing';

import { MenusServices } from './menus.services';

describe('MenusServices', () => {
  let service: MenusServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
