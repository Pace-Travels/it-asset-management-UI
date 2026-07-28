import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudSubscriptionServiceService } from '../../../../core/services/master/cloud-subscription-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-cloud-subscription-service-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './cloud-subscription-service-edit.html',
  styleUrl: './cloud-subscription-service-edit.scss',
})
export class CloudSubscriptionServiceEdit {

  cloudSubsServiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailAccStatusService: CloudSubscriptionServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  cloudSubsServiceId!: number;

  ngOnInit() {

    this.cloudSubsServiceForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.cloudSubsServiceId = Number(params['id']);

      if (this.cloudSubsServiceId) {

        this.getCloudSubsServiceData();

      }

    });

  }

  getCloudSubsServiceData(): void {

    this.emailAccStatusService
      .getByIdData(this.cloudSubsServiceId)
      .subscribe({

        next: (response) => {
          if (response.success) {

            this.cloudSubsServiceForm.patchValue({

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

    if (this.cloudSubsServiceForm.invalid) {

      this.cloudSubsServiceForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.cloudSubsServiceForm.value.name,

      description: this.cloudSubsServiceForm.value.description

    };

    // Edit Mode
    if (this.cloudSubsServiceId) {

      this.emailAccStatusService
        .update(this.cloudSubsServiceId, payload)
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
                  '/cloud-subs-service'
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

      this.emailAccStatusService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/cloud-subs-service']);

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

    const control = this.cloudSubsServiceForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
