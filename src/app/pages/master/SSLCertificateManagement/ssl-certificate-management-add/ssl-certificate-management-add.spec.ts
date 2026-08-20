import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSLCertificateManagementAdd } from './ssl-certificate-management-add';

describe('SSLCertificateManagementAdd', () => {
  let component: SSLCertificateManagementAdd;
  let fixture: ComponentFixture<SSLCertificateManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSLCertificateManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SSLCertificateManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
