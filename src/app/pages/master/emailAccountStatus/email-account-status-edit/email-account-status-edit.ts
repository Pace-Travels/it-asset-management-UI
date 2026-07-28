import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmailAccountStatusService } from '../../../../core/services/master/email-account-status.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-email-account-status-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './email-account-status-edit.html',
  styleUrl: './email-account-status-edit.scss',
})
export class EmailAccountStatusEdit {

  emailAccStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailAccStatusService: EmailAccountStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  emailAccStatusId!: number;

  ngOnInit() {

    this.emailAccStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.emailAccStatusId = Number(params['id']);

      if (this.emailAccStatusId) {

        this.getEmailAccStatusData();

      }

    });

  }

  getEmailAccStatusData(): void {

    this.emailAccStatusService
      .getByIdData(this.emailAccStatusId)
      .subscribe({

        next: (response) => {
          if (response.success) {

            this.emailAccStatusForm.patchValue({

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

    if (this.emailAccStatusForm.invalid) {

      this.emailAccStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.emailAccStatusForm.value.name,

      description: this.emailAccStatusForm.value.description

    };

    // Edit Mode
    if (this.emailAccStatusId) {

      this.emailAccStatusService
        .update(this.emailAccStatusId, payload)
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

              this.router.navigate(['/mobile-recharge-status']);

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

    const control = this.emailAccStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
