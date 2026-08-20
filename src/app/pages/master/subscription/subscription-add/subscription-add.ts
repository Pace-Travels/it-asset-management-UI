import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { SubscriptionService } from '../../../../core/services/master/subscription.service';

@Component({
  selector: 'app-subscription-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './subscription-add.html',
  styleUrl: './subscription-add.scss',
})
export class SubscriptionAdd implements OnInit {

  subscriptionForm!: FormGroup;
  submitted = false;

  vendors: any[] = [];
  paymentMethods: any[] = [];
  reminderTypes: any[] = [];
  employees: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.subscriptionForm = this.fb.group({
      subscriptionCode: ['', Validators.required],
      vendorId: [null, Validators.required],
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      paymentMethodId: [null, Validators.required],
      reminderTypeId: [null, Validators.required],
      reminderSentTo: ['', Validators.required],
      expectedPaymentDate: ['', Validators.required],
      paymentInitiatedById: [null, Validators.required],
      expiryDate: ['', Validators.required],
      paymentDate: ['', Validators.required],
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
          this.router.navigate(['/subscription']);
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