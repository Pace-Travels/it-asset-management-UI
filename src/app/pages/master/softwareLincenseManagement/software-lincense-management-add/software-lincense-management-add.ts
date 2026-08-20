import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { SoftwareLicenseCategoryService } from '../../../../core/services/master/software-license-category.service';

@Component({
  selector: 'app-software-lincense-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './software-lincense-management-add.html',
  styleUrl: './software-lincense-management-add.scss',
})
export class SoftwareLincenseManagementAdd implements OnInit {

  licenseForm!: FormGroup;
  submitted = false;

  categories: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private softwareLicenseService: SoftwareLicenseCategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.licenseForm = this.fb.group({
      licenseCode: ['', Validators.required],
      softwareName: ['', Validators.required],
      softwareCategoryId: [null, Validators.required],
      vendorId: [null, Validators.required],
      licenseType: ['', Validators.required],
      numberOfUsers: [1, [Validators.required, Validators.min(1)]],
      assignedUsers: [0, [Validators.required, Validators.min(0)]],
      purchaseDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      renewalDate: [''],
      renewalCost: [null],
      remarks: [''],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.licenseForm.invalid) {
      this.licenseForm.markAllAsTouched();
      return;
    }

    const payload = this.licenseForm.value;

    this.softwareLicenseService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/software-license-management']);
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
    const control = this.licenseForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}