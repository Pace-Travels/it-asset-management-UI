import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MonitoringMaintenceServices } from '../../../../core/services/master/monitoring-maintence.services';

@Component({
  selector: 'app-monitoring-maintenance-add',
  standalone: true,
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './monitoring-maintence-add.html',
  styleUrl: './monitoring-maintence-add.scss',
})
export class MonitoringMaintenceAdd implements OnInit {

  maintenanceForm!: FormGroup;
  submitted = false;

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MonitoringMaintenceServices,
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
  }

  save(): void {
    this.submitted = true;

    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      return;
    }

    const payload = this.maintenanceForm.value;

    this.maintenanceService.add(payload).subscribe({
      next: (response) => {
        if (response?.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Maintenance record added successfully'
          });
          this.router.navigate(['/monitoring-maintenance']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message || 'Failed to add maintenance record'
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