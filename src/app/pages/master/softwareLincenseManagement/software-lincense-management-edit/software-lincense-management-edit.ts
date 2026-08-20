import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { SoftwareLicenseCategoryService } from '../../../../core/services/master/software-license-category.service';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-software-lincense-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './software-lincense-management-edit.html',
  styleUrl: './software-lincense-management-edit.scss',
})
export class SoftwareLincenseManagementEdit implements OnInit {

  licenseForm!: FormGroup;
  licenseId!: number;
  submitted = false;

  categories: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private softwareLicenseService: SoftwareLicenseCategoryService,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.licenseId = Number(params['id']);
      if (this.licenseId) {
        this.getLicenseData();
      }
    });
  }

  getLicenseData(): void {
    this.softwareLicenseService
      .getByIdData(this.licenseId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.licenseForm.patchValue({
              licenseCode: response.data.licenseCode,
              softwareName: response.data.softwareName,
              softwareCategoryId: response.data.softwareCategoryId,
              vendorId: response.data.vendorId,
              licenseType: response.data.licenseType,
              numberOfUsers: response.data.numberOfUsers,
              assignedUsers: response.data.assignedUsers,
              purchaseDate: response.data.purchaseDate,
              expiryDate: response.data.expiryDate,
              renewalDate: response.data.renewalDate,
              renewalCost: response.data.renewalCost,
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

    if (this.licenseForm.invalid) {
      this.licenseForm.markAllAsTouched();
      return;
    }

    const payload = this.licenseForm.value;

    this.softwareLicenseService
      .update(this.licenseId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/software-license-management']);
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
    const control = this.licenseForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}