import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { SslCertificateManagementService } from '../../../../core/services/master/ssl-certificate-management.service';

@Component({
  selector: 'app-ssl-certificate-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './ssl-certificate-management-add.html',
  styleUrl: './ssl-certificate-management-add.scss',
})
export class SSLCertificateManagementAdd implements OnInit {

  sslForm!: FormGroup;
  submitted = false;

  domains: any[] = [];
  statuses: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private sslService: SslCertificateManagementService,
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
  }

  save(): void {
    this.submitted = true;

    if (this.sslForm.invalid) {
      this.sslForm.markAllAsTouched();
      return;
    }

    const payload = this.sslForm.value;

    this.sslService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/ssl-certificate-management']);
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