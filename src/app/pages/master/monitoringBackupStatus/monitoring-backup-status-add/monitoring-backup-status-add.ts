import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonitoringBackupStatusService } from '../../../../core/services/master/monitoring-backup-status.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-monitoring-backup-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './monitoring-backup-status-add.html',
  styleUrl: './monitoring-backup-status-add.scss',
})
export class MonitoringBackupStatusAdd {

  monitoringBackupStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monitoringBackupStatusService: MonitoringBackupStatusService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.monitoringBackupStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.monitoringBackupStatusForm.invalid) {

      this.monitoringBackupStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.monitoringBackupStatusForm.value.name,
      description: this.monitoringBackupStatusForm.value.description

    };

    this.monitoringBackupStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/monitoring-backup-status']);

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
  private location = inject(Location);

  goBack() {

    this.location.back();

  }


  isInvalid(controlName: string): boolean {

    const control = this.monitoringBackupStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }


}
