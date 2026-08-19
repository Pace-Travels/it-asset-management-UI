import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { ServerManagementService } from '../../../../core/services/master/server-management.service';

@Component({
  selector: 'app-server-management-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './server-management-add.html',
  styleUrl: './server-management-add.scss',
})
export class ServerManagementAdd implements OnInit {

  serverForm!: FormGroup;
  submitted = false;

  categories: any[] = [];
  statuses: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private serverManagementService: ServerManagementService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.serverForm = this.fb.group({
      serverCode: ['', Validators.required],
      serverName: ['', Validators.required],
      serverCategoryId: [null, Validators.required],
      serverStatusId: [null, Validators.required],
      serverLocation: ['', Validators.required],
      hostName: ['', Validators.required],
      ipAddress: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      vendorId: [null, Validators.required],
      ram: [''],
      storage: [''],
      processor: [''],
      purchaseDate: [''],
      expiryDate: [''],
      remarks: [''],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.serverForm.invalid) {
      this.serverForm.markAllAsTouched();
      return;
    }

    const payload = this.serverForm.value;

    this.serverManagementService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/server-management']);
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
    const control = this.serverForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}