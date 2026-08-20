import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSLCertificateManagementList } from './ssl-certificate-management-list';

describe('SSLCertificateManagementList', () => {
  let component: SSLCertificateManagementList;
  let fixture: ComponentFixture<SSLCertificateManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSLCertificateManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(SSLCertificateManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
