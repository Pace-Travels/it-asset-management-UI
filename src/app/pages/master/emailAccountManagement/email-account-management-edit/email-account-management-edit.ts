import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { EmailAccountManagementService } from '../../../../core/services/master/email-account-management.service';

@Component({
  selector: 'app-email-account-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './email-account-management-edit.html',
  styleUrl: './email-account-management-edit.scss',
})
export class EmailAccountManagementEdit implements OnInit {

  emailAccountForm!: FormGroup;
  emailAccountId!: number;
  submitted = false;

  employees: any[] = [];
  statuses: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private emailAccountService: EmailAccountManagementService,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.emailAccountId = Number(params['id']);
      if (this.emailAccountId) {
        this.getEmailAccountData();
      }
    });
  }

  getEmailAccountData(): void {
    this.emailAccountService
      .getByIdData(this.emailAccountId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.emailAccountForm.patchValue({
              emailCode: response.data.emailCode,
              emailAddress: response.data.emailAddress,
              employeeId: response.data.employeeId,
              provider: response.data.provider,
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

    if (this.emailAccountForm.invalid) {
      this.emailAccountForm.markAllAsTouched();
      return;
    }

    const payload = this.emailAccountForm.value;

    this.emailAccountService
      .update(this.emailAccountId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/email-account-management']);
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
    const control = this.emailAccountForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}