import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { EmailAccountManagementService } from '../../../../core/services/master/email-account-management.service';

@Component({
  selector: 'app-email-account-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './email-account-management-add.html',
  styleUrl: './email-account-management-add.scss',
})
export class EmailAccountManagementAdd implements OnInit {

  emailAccountForm!: FormGroup;
  submitted = false;

  employees: any[] = [];
  statuses: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private emailAccountService: EmailAccountManagementService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.emailAccountForm = this.fb.group({
      emailCode: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      employeeId: [null, Validators.required],
      provider: ['', Validators.required],
      renewalDate: [''],
      renewalCost: [null],
      statusId: [null, Validators.required],
      remarks: [''],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.emailAccountForm.invalid) {
      this.emailAccountForm.markAllAsTouched();
      return;
    }

    const payload = this.emailAccountForm.value;

    this.emailAccountService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/email-account-management']);
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
    const control = this.emailAccountForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}