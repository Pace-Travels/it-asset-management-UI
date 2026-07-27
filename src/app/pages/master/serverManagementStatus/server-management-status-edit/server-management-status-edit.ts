import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerManagementStatusService } from '../../../../core/services/master/server-management-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-server-management-status-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './server-management-status-edit.html',
  styleUrl: './server-management-status-edit.scss',
})
export class ServerManagementStatusEdit {

  serverMangStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serverMangStatusService: ServerManagementStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  serverMangStatusId!: number;

  ngOnInit() {

    this.serverMangStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.serverMangStatusId = Number(params['id']);

      if (this.serverMangStatusId) {

        this.getAssetInfoData();

      }

    });

  }

  getAssetInfoData(): void {

    this.serverMangStatusService
      .getAssetInfoData(this.serverMangStatusId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.serverMangStatusForm.patchValue({

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

    if (this.serverMangStatusForm.invalid) {

      this.serverMangStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.serverMangStatusForm.value.name,

      description: this.serverMangStatusForm.value.description

    };

    // Edit Mode
    if (this.serverMangStatusId) {

      this.serverMangStatusService
        .update(this.serverMangStatusId, payload)
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

      this.serverMangStatusService
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

    const control = this.serverMangStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }


}
