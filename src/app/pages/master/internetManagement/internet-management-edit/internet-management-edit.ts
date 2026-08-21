import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { InternetManagementServices } from '../../../../core/services/master/internet-management.services';

@Component({
  selector: 'app-internet-management-edit',
  standalone: true,
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './internet-management-edit.html',
  styleUrl: './internet-management-edit.scss',
})
export class InternetManagementEdit implements OnInit {

  internetForm!: FormGroup;
  internetId!: number;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private internetManagementService: InternetManagementServices,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.internetForm = this.fb.group({
      internetCode: ['', [Validators.required, Validators.maxLength(30)]],
      ispName: ['', [Validators.required, Validators.maxLength(150)]],
      connectionType: ['', [Validators.required, Validators.maxLength(100)]],
      planName: ['', [Validators.required, Validators.maxLength(150)]],
      bandwidth: ['', [Validators.required, Validators.maxLength(100)]],
      contractStartDate: ['', Validators.required],
      contractEndDate: ['', Validators.required],
      renewalDate: [null],
      monthlyCharges: [null, [Validators.required, Validators.min(0)]],
      remarks: ['', [Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.internetId = Number(params['id']);
      if (this.internetId) {
        this.getInternetData();
      }
    });
  }

  getInternetData(): void {
    this.internetManagementService
      .getByIdData(this.internetId)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            const data = response.data;
            this.internetForm.patchValue({
              internetCode: data.internetCode,
              ispName: data.ispName,
              connectionType: data.connectionType,
              planName: data.planName,
              bandwidth: data.bandwidth,
              contractStartDate: data.contractStartDate,
              contractEndDate: data.contractEndDate,
              renewalDate: data.renewalDate,
              monthlyCharges: data.monthlyCharges,
              remarks: data.remarks,
              isActive: data.isActive
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Failed to load details.'
          });
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.internetForm.invalid) {
      this.internetForm.markAllAsTouched();
      return;
    }

    const payload = this.internetForm.value;

    this.internetManagementService
      .update(this.internetId, payload)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Internet connection updated successfully'
            });

            setTimeout(() => {
              this.router.navigate(['/internet-management']);
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Failed to update record'
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
    const control = this.internetForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}