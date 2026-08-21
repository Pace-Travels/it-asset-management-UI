import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { CloudSubscriptionManagementServices } from '../../../../core/services/master/cloud-subscription-management.services';

@Component({
  selector: 'app-cloud-subscription-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './cloud-subscription-management-add.html',
  styleUrl: './cloud-subscription-management-add.scss',
})
export class CloudSubscriptionManagementAdd implements OnInit {

  subscriptionForm!: FormGroup;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private subscriptionService: CloudSubscriptionManagementServices,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.subscriptionForm = this.fb.group({
      subscriptionCode: ['', [Validators.required, Validators.maxLength(30)]],
      serviceName: ['', [Validators.required, Validators.maxLength(150)]],
      subscriptionType: ['', [Validators.required, Validators.maxLength(100)]],
      renewalDate: [null],
      monthlyYearlyCost: [null, [Validators.min(0)]],
      accountOwner: ['', [Validators.required, Validators.maxLength(150)]],
      remarks: ['', [Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.subscriptionForm.invalid) {
      this.subscriptionForm.markAllAsTouched();
      return;
    }

    const payload = this.subscriptionForm.value;

    this.subscriptionService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/cloud-subscription-management']);
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
    const control = this.subscriptionForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}