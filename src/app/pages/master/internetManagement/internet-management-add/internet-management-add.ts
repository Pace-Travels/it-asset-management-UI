import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { InternetManagementServices } from '../../../../core/services/master/internet-management.services';

@Component({
  selector: 'app-internet-management-add',
  standalone: true,
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './internet-management-add.html',
  styleUrl: './internet-management-add.scss',
})
export class InternetManagementAdd implements OnInit {

  internetForm!: FormGroup;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private internetManagementService: InternetManagementServices,
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
  }

  save(): void {
    this.submitted = true;

    if (this.internetForm.invalid) {
      this.internetForm.markAllAsTouched();
      return;
    }

    const payload = this.internetForm.value;

    this.internetManagementService.add(payload).subscribe({
      next: (response) => {
        if (response?.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Internet connection added successfully'
          });
          this.router.navigate(['/internet-management']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message || 'Failed to add connection details'
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