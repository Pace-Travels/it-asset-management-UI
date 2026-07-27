import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonitoringServerHealthStatusService } from '../../../../core/services/master/monitoring-server-health-status.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-monitoring-server-health-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './monitoring-server-health-status-add.html',
  styleUrl: './monitoring-server-health-status-add.scss',
})
export class MonitoringServerHealthStatusAdd {

  monitoringServHlthStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monitoringServeHlthStatusService: MonitoringServerHealthStatusService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.monitoringServHlthStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.monitoringServHlthStatusForm.invalid) {

      this.monitoringServHlthStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.monitoringServHlthStatusForm.value.name,
      description: this.monitoringServHlthStatusForm.value.description

    };

    this.monitoringServeHlthStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/monitoring-server-health-status']);

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

    const control = this.monitoringServHlthStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
