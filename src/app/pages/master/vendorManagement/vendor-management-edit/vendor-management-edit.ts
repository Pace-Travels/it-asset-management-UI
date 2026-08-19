import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { VendorManagmentService } from '../../../../core/services/master/vendor-managment.service';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-vendor-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './vendor-management-edit.html',
  styleUrl: './vendor-management-edit.scss',
})
export class VendorManagementEdit implements OnInit {

  vendorForm!: FormGroup;
  vendorId!: number;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private vendorManagementService: VendorManagmentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      vendorCode: ['', Validators.required],
      vendorName: ['', Validators.required],
      contactPerson: [''],
      mobileNumber: [''],
      email: [''],
      website: [''],
      gstNumber: [''],
      panNumber: [''],
      isActive: [true, Validators.required],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
      remarks: ['']
    });

    this.route.params.subscribe(params => {
      this.vendorId = Number(params['id']);
      if (this.vendorId) {
        this.getVendorData();
      }
    });
  }

  getVendorData(): void {
    this.vendorManagementService
      .getByIdData(this.vendorId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.vendorForm.patchValue({
              vendorCode: response.data.vendorCode,
              vendorName: response.data.vendorName,
              contactPerson: response.data.contactPerson,
              mobileNumber: response.data.mobileNumber,
              email: response.data.email,
              website: response.data.website,
              gstNumber: response.data.gstNumber,
              panNumber: response.data.panNumber,
              isActive: response.data.isActive,
              address: response.data.address,
              city: response.data.city,
              state: response.data.state,
              country: response.data.country,
              postalCode: response.data.postalCode,
              remarks: response.data.remarks
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

    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    const payload = this.vendorForm.value;

    this.vendorManagementService
      .update(this.vendorId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/vendor-management']);
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
    const control = this.vendorForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}