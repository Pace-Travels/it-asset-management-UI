import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionPaymentMethod } from '../../../../core/services/master/subscription-payment-method';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-subscription-payment-method-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './subscription-payment-method-edit.html',
  styleUrl: './subscription-payment-method-edit.scss',
})
export class SubscriptionPaymentMethodEdit {

  subsPaymentMethodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subsPaymentMethodService: SubscriptionPaymentMethod,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  subsPaymentMethodId!: number;

  ngOnInit() {

    this.subsPaymentMethodForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.subsPaymentMethodId = Number(params['id']);

      if (this.subsPaymentMethodId) {

        this.getAdminTypeData();

      }

    });

  }

  getAdminTypeData(): void {

    this.subsPaymentMethodService
      .getByIdData(this.subsPaymentMethodId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.subsPaymentMethodForm.patchValue({

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

    if (this.subsPaymentMethodForm.invalid) {

      this.subsPaymentMethodForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.subsPaymentMethodForm.value.name,

      description: this.subsPaymentMethodForm.value.description

    };

    // Edit Mode
    if (this.subsPaymentMethodId) {

      this.subsPaymentMethodService
        .update(this.subsPaymentMethodId, payload)
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
                  '/subscription-payment-method'
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

      this.subsPaymentMethodService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/subscription-payment-method']);

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

    const control = this.subsPaymentMethodForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
