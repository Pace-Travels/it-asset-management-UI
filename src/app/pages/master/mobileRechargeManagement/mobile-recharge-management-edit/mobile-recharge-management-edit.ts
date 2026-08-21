import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MobileRechargeManagementServices } from '../../../../core/services/master/mobile-recharge-management.services';

@Component({
  selector: 'app-mobile-recharge-management-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './mobile-recharge-management-edit.html',
  styleUrl: './mobile-recharge-management-edit.scss',
})
export class MobileRechargeManagementEdit implements OnInit {

  rechargeForm!: FormGroup;
  rechargeId!: number;
  submitted = false;
  statusList: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private mobileRechargeService: MobileRechargeManagementServices,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.rechargeForm = this.fb.group({
      mobileRechargeCode: ['', [Validators.required, Validators.maxLength(30)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9+ ]*$')]],
      assignedEmployee: ['', [Validators.required, Validators.maxLength(150)]],
      serviceProvider: ['', [Validators.required, Validators.maxLength(100)]],
      rechargeAmount: [null, [Validators.required, Validators.min(0)]],
      rechargeDate: ['', Validators.required],
      validityPeriod: ['', [Validators.required, Validators.maxLength(50)]],
      nextRechargeDate: ['', Validators.required],
      statusId: [null, Validators.required],
      remarks: ['', [Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });

    this.getStatusList();

    this.route.params.subscribe(params => {
      this.rechargeId = Number(params['id']);
      if (this.rechargeId) {
        this.getRechargeData();
      }
    });
  }

  getStatusList(): void {
    this.mobileRechargeService.getStatusList().subscribe({
      next: (res) => {
        if (res.success) {
          this.statusList = res.data;
        }
      },
      error: (err) => console.error(err)
    });
  }

  getRechargeData(): void {
    this.mobileRechargeService
      .getByIdData(this.rechargeId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.rechargeForm.patchValue({
              mobileRechargeCode: response.data.mobileRechargeCode,
              mobileNumber: response.data.mobileNumber,
              assignedEmployee: response.data.assignedEmployee,
              serviceProvider: response.data.serviceProvider,
              rechargeAmount: response.data.rechargeAmount,
              rechargeDate: response.data.rechargeDate,
              validityPeriod: response.data.validityPeriod,
              nextRechargeDate: response.data.nextRechargeDate,
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

    if (this.rechargeForm.invalid) {
      this.rechargeForm.markAllAsTouched();
      return;
    }

    const payload = this.rechargeForm.value;

    this.mobileRechargeService
      .update(this.rechargeId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/mobile-recharge-management']);
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
    const control = this.rechargeForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}