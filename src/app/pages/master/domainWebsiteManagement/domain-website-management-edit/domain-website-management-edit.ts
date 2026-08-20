import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { DomainWebsiteManagementService } from '../../../../core/services/master/domain-website-management.service';

@Component({
  selector: 'app-domain-website-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './domain-website-management-edit.html',
  styleUrl: './domain-website-management-edit.scss',
})
export class DomainWebsiteManagementEdit implements OnInit {

  domainForm!: FormGroup;
  domainId!: number;
  submitted = false;

  servers: any[] = [];
  statuses: any[] = [];
  vendors: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private domainWebsiteService: DomainWebsiteManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      domainCode: ['', Validators.required],
      domainName: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      hostingProvider: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      renewalDate: [''],
      renewalCost: [null],
      serverId: [null, Validators.required],
      statusId: [null, Validators.required],
      vendorId: [null],
      remarks: [''],
      isActive: [true, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.domainId = Number(params['id']);
      if (this.domainId) {
        this.getDomainData();
      }
    });
  }

  getDomainData(): void {
    this.domainWebsiteService
      .getByIdData(this.domainId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.domainForm.patchValue({
              domainCode: response.data.domainCode,
              domainName: response.data.domainName,
              websiteUrl: response.data.websiteUrl,
              hostingProvider: response.data.hostingProvider,
              purchaseDate: response.data.purchaseDate,
              expiryDate: response.data.expiryDate,
              renewalDate: response.data.renewalDate,
              renewalCost: response.data.renewalCost,
              serverId: response.data.serverId,
              statusId: response.data.statusId,
              vendorId: response.data.vendorId,
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

    if (this.domainForm.invalid) {
      this.domainForm.markAllAsTouched();
      return;
    }

    const payload = this.domainForm.value;

    this.domainWebsiteService
      .update(this.domainId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/domain-website-management']);
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
    const control = this.domainForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}