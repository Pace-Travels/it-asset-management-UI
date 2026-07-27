import { TestBed } from '@angular/core/testing';

import { AppInitServiceTs } from './app-init.service.ts';

describe('AppInitServiceTs', () => {
  let service: AppInitServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
