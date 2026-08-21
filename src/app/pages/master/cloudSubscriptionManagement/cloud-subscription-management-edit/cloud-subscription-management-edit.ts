import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { CloudSubscriptionManagementServices } from '../../../../core/services/master/cloud-subscription-management.services';

@Component({
  selector: 'app-cloud-subscription-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './cloud-subscription-management-edit.html',
  styleUrl: './cloud-subscription-management-edit.scss',
})
export class CloudSubscriptionManagementEdit implements OnInit {

  subscriptionForm!: FormGroup;
  subscriptionId!: number;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private subscriptionService: CloudSubscriptionManagementServices,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.subscriptionId = Number(params['id']);
      if (this.subscriptionId) {
        this.getSubscriptionData();
      }
    });
  }

  getSubscriptionData(): void {
    this.subscriptionService
      .getByIdData(this.subscriptionId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.subscriptionForm.patchValue({
              subscriptionCode: response.data.subscriptionCode,
              serviceName: response.data.serviceName,
              subscriptionType: response.data.subscriptionType,
              renewalDate: response.data.renewalDate,
              monthlyYearlyCost: response.data.monthlyYearlyCost,
              accountOwner: response.data.accountOwner,
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

    if (this.subscriptionForm.invalid) {
      this.subscriptionForm.markAllAsTouched();
      return;
    }

    const payload = this.subscriptionForm.value;

    this.subscriptionService
      .update(this.subscriptionId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/cloud-subscription-management']);
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
    const control = this.subscriptionForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}