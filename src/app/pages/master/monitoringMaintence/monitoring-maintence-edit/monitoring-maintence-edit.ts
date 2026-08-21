import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MonitoringMaintenceServices } from '../../../../core/services/master/monitoring-maintence.services';

@Component({
  selector: 'app-monitoring-maintenance-edit',
  standalone: true,
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './monitoring-maintence-edit.html',
  styleUrl: './monitoring-maintence-edit.scss',
})
export class MonitoringMaintenceEdit implements OnInit {

  maintenanceForm!: FormGroup;
  maintenanceId!: number;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MonitoringMaintenceServices,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.maintenanceForm = this.fb.group({
      maintenanceCode: ['', [Validators.required, Validators.maxLength(30)]],
      serverId: [null, Validators.required],
      maintenanceSchedule: ['', Validators.required],
      maintenanceHistory: [''],
      backupSchedule: ['', Validators.required],
      backupStatusId: [null, Validators.required],
      uptimePercentage: [null, [Validators.min(0), Validators.max(100)]],
      serverHealthStatusId: [null, Validators.required],
      remarks: ['', [Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.maintenanceId = Number(params['id']);
      if (this.maintenanceId) {
        this.getMaintenanceData();
      }
    });
  }

  getMaintenanceData(): void {
    this.maintenanceService
      .getByIdData(this.maintenanceId)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            const data = response.data;
            this.maintenanceForm.patchValue({
              maintenanceCode: data.maintenanceCode,
              serverId: data.serverId,
              maintenanceSchedule: data.maintenanceSchedule ? new Date(data.maintenanceSchedule).toISOString().slice(0, 16) : '',
              maintenanceHistory: data.maintenanceHistory,
              backupSchedule: data.backupSchedule ? new Date(data.backupSchedule).toISOString().slice(0, 16) : '',
              backupStatusId: data.backupStatusId,
              uptimePercentage: data.uptimePercentage,
              serverHealthStatusId: data.serverHealthStatusId,
              remarks: data.remarks,
              isActive: data.isActive
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Failed to load record details.'
          });
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      return;
    }

    const payload = this.maintenanceForm.value;

    this.maintenanceService
      .update(this.maintenanceId, payload)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Maintenance record updated successfully'
            });

            setTimeout(() => {
              this.router.navigate(['/monitoring-maintenance']);
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Failed to update maintenance record'
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
    const control = this.maintenanceForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}