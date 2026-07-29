import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { RenewalReminderTypeService } from '../../../../core/services/master/renewal-reminder-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-renewal-reminder-type-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './renewal-reminder-type-edit.html',
  styleUrl: './renewal-reminder-type-edit.scss',
})
export class RenewalReminderTypeEdit {

  renewlaRemTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private renewalRemTypeService: RenewalReminderTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  renewalRemTypeId!: number;

  ngOnInit() {

    this.renewlaRemTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.renewalRemTypeId = Number(params['id']);

      if (this.renewalRemTypeId) {

        this.getRenewalRemTypeData();

      }

    });

  }

  getRenewalRemTypeData(): void {

    this.renewalRemTypeService
      .getByIdData(this.renewalRemTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.renewlaRemTypeForm.patchValue({

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

    if (this.renewlaRemTypeForm.invalid) {

      this.renewlaRemTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.renewlaRemTypeForm.value.name,

      description: this.renewlaRemTypeForm.value.description

    };

    // Edit Mode
    if (this.renewalRemTypeId) {

      this.renewalRemTypeService
        .update(this.renewalRemTypeId, payload)
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
                  '/renewal-reminder-type'
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

      this.renewalRemTypeService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/renewal-reminder-type']);

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

    const control = this.renewlaRemTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
