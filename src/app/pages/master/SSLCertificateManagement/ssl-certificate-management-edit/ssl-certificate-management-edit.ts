import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { SslCertificateManagementService } from '../../../../core/services/master/ssl-certificate-management.service';

@Component({
  selector: 'app-ssl-certificate-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './ssl-certificate-management-edit.html',
  styleUrl: './ssl-certificate-management-edit.scss',
})
export class SSLCertificateManagementEdit implements OnInit {

  sslForm!: FormGroup;
  sslId!: number;
  submitted = false;

  domains: any[] = [];
  statuses: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private sslService: SslCertificateManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.sslForm = this.fb.group({
      sslCode: ['', Validators.required],
      domainId: [null, Validators.required],
      certificateProvider: ['', Validators.required],
      certificateType: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      renewalDate: [''],
      renewalCost: [null],
      statusId: [null, Validators.required],
      remarks: [''],
      isActive: [true, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.sslId = Number(params['id']);
      if (this.sslId) {
        this.getSSLData();
      }
    });
  }

  getSSLData(): void {
    this.sslService
      .getByIdData(this.sslId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.sslForm.patchValue({
              sslCode: response.data.sslCode,
              domainId: response.data.domainId,
              certificateProvider: response.data.certificateProvider,
              certificateType: response.data.certificateType,
              purchaseDate: response.data.purchaseDate,
              expiryDate: response.data.expiryDate,
              renewalDate: response.data.renewalDate,
              renewalCost: response.data.renewalCost,
              statusId: response.data.statusId,
              remarks: response.data.remarks,
              isActive: response.data.isActive
            });
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.sslForm.invalid) {
      this.sslForm.markAllAsTouched();
      return;
    }

    const payload = this.sslForm.value;

    this.sslService
      .update(this.sslId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/ssl-certificate-management']);
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Something went wrong.'
          });
        }
      });
  }

  goBack() {
    this.location.back();
  }

  isInvalid(controlName: string): boolean {
    const control = this.sslForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}