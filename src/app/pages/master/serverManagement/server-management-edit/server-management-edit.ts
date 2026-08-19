import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { ServerManagementService } from '../../../../core/services/master/server-management.service';

@Component({
  selector: 'app-server-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './server-management-edit.html',
  styleUrl: './server-management-edit.scss',
})
export class ServerManagementEdit implements OnInit {

  serverForm!: FormGroup;
  serverId!: number;
  submitted = false;

  categories: any[] = [];
  statuses: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private serverManagementService: ServerManagementService,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.serverId = Number(params['id']);
      if (this.serverId) {
        this.getServerData();
      }
    });
  }

  getServerData(): void {
    this.serverManagementService
      .getByIdData(this.serverId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.serverForm.patchValue({
              serverCode: response.data.serverCode,
              serverName: response.data.serverName,
              serverCategoryId: response.data.serverCategoryId,
              serverStatusId: response.data.serverStatusId,
              serverLocation: response.data.serverLocation,
              hostName: response.data.hostName,
              ipAddress: response.data.ipAddress,
              operatingSystem: response.data.operatingSystem,
              vendorId: response.data.vendorId,
              ram: response.data.ram,
              storage: response.data.storage,
              processor: response.data.processor,
              purchaseDate: response.data.purchaseDate,
              expiryDate: response.data.expiryDate,
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

    if (this.serverForm.invalid) {
      this.serverForm.markAllAsTouched();
      return;
    }

    const payload = this.serverForm.value;

    this.serverManagementService
      .update(this.serverId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/server-management']);
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
    const control = this.serverForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}