import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubscriptionReminderType } from '../../../../core/services/master/subscription-reminder-type';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-subscription-reminder-type-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './subscription-reminder-type-edit.html',
  styleUrl: './subscription-reminder-type-edit.scss',
})
export class SubscriptionReminderTypeEdit {

  subsReminderTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subsReminderTypeService: SubscriptionReminderType,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  subsReminderTypeId!: number;

  ngOnInit() {

    this.subsReminderTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.subsReminderTypeId = Number(params['id']);

      if (this.subsReminderTypeId) {

        this.getSubsReminderTypeData();

      }

    });

  }

  getSubsReminderTypeData(): void {

    this.subsReminderTypeService
      .getByIdData(this.subsReminderTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.subsReminderTypeForm.patchValue({

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

    if (this.subsReminderTypeForm.invalid) {

      this.subsReminderTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.subsReminderTypeForm.value.name,

      description: this.subsReminderTypeForm.value.description

    };

    // Edit Mode
    if (this.subsReminderTypeId) {

      this.subsReminderTypeService
        .update(this.subsReminderTypeId, payload)
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
                  '/subscription-reminder-type'
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

      this.subsReminderTypeService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/subscription-reminder-type']);

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

    const control = this.subsReminderTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
