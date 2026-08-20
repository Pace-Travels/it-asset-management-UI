import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { DomainWebsiteManagementService } from '../../../../core/services/master/domain-website-management.service';

@Component({
  selector: 'app-domain-website-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './domain-website-management-add.html',
  styleUrl: './domain-website-management-add.scss',
})
export class DomainWebsiteManagementAdd implements OnInit {

  domainForm!: FormGroup;
  submitted = false;

  servers: any[] = [];
  statuses: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private domainWebsiteService: DomainWebsiteManagementService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      domainCode: ['', Validators.required],
      domainName: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      hostingProvider: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      renewalDate: [''],
      renewalCost: [null],
      serverId: [null, Validators.required],
      statusId: [null, Validators.required],
      vendorId: [null],
      remarks: [''],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.domainForm.invalid) {
      this.domainForm.markAllAsTouched();
      return;
    }

    const payload = this.domainForm.value;

    this.domainWebsiteService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/domain-website-management']);
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
    const control = this.domainForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}