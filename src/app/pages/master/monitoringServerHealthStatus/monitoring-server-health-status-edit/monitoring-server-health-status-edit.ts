import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MonitoringServerHealthStatusService } from '../../../../core/services/master/monitoring-server-health-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-monitoring-server-health-status-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './monitoring-server-health-status-edit.html',
  styleUrl: './monitoring-server-health-status-edit.scss',
})
export class MonitoringServerHealthStatusEdit {

  monitoringServeHlthStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monitoringBackupStatusService: MonitoringServerHealthStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  monitoringServeHlthStatusId!: number;

  ngOnInit() {

    this.monitoringServeHlthStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.monitoringServeHlthStatusId = Number(params['id']);

      if (this.monitoringServeHlthStatusId) {

        this.getMonitoringServeHlthStatusData();

      }

    });

  }

  getMonitoringServeHlthStatusData(): void {

    this.monitoringBackupStatusService
      .getByIdData(this.monitoringServeHlthStatusId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.monitoringServeHlthStatusForm.patchValue({

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

    if (this.monitoringServeHlthStatusForm.invalid) {

      this.monitoringServeHlthStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.monitoringServeHlthStatusForm.value.name,

      description: this.monitoringServeHlthStatusForm.value.description

    };

    // Edit Mode
    if (this.monitoringServeHlthStatusId) {

      this.monitoringBackupStatusService
        .update(this.monitoringServeHlthStatusId, payload)
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
                  '/monitoring-server-health-status'
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

              this.router.navigate(['/monitoring-server-health-status']);

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

    const control = this.monitoringServeHlthStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
