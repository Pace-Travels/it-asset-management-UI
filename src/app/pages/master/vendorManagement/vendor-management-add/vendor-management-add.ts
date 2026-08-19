import { Component, inject, OnInit } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorManagmentService } from '../../../../core/services/master/vendor-managment.service';

@Component({
  selector: 'app-vendor-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './vendor-management-add.html',
  styleUrl: './vendor-management-add.scss',
})
export class VendorManagementAdd implements OnInit {

  vendorForm!: FormGroup;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private vendorManagementService: VendorManagmentService,
    private router: Router,
    private messageService: MessageService,
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
  }

  save(): void {
    this.submitted = true;

    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    const payload = this.vendorForm.value;

    this.vendorManagementService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/vendor-management']);
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