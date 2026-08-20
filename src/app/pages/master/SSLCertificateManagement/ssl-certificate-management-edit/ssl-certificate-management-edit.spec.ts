import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSLCertificateManagementEdit } from './ssl-certificate-management-edit';

describe('SSLCertificateManagementEdit', () => {
  let component: SSLCertificateManagementEdit;
  let fixture: ComponentFixture<SSLCertificateManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSLCertificateManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SSLCertificateManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
