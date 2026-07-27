import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonitoringBackupStatusService } from '../../../../core/services/master/monitoring-backup-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-monitoring-backup-status-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './monitoring-backup-status-edit.html',
  styleUrl: './monitoring-backup-status-edit.scss',
})
export class MonitoringBackupStatusEdit {

  monitoringBackupStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monitoringBackupStatusService: MonitoringBackupStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  assetId!: number;

  ngOnInit() {

    this.monitoringBackupStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.assetId = Number(params['id']);

      if (this.assetId) {

        this.getMonitoringBackupStatusData();

      }

    });

  }

  getMonitoringBackupStatusData(): void {

    this.monitoringBackupStatusService
      .getByIdData(this.assetId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.monitoringBackupStatusForm.patchValue({

              name: response.data.name,

              description: response.data.description

            });

          }

        },

        error: (error) => {

          console.error(error);

        }

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

    // Edit Mode
    if (this.assetId) {

      this.monitoringBackupStatusService
        .update(this.assetId, payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              setTimeout(() => {

                this.router.navigate([
                  '/asset-info-status'
                ]);

              }, 1000);

            }
            else {

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

    // Add Mode
    else {

      this.monitoringBackupStatusService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/asset-info-status']);

            }
            else {

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
