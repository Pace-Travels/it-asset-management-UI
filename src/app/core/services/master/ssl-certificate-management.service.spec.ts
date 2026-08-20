import { TestBed } from '@angular/core/testing';

import { SslCertificateManagementService } from './ssl-certificate-management.service';

describe('SslCertificateManagementService', () => {
  let service: SslCertificateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SslCertificateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
