import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionPaymentMethod } from '../../../../core/services/master/subscription-payment-method';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-subscription-payment-method-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './subscription-payment-method-add.html',
  styleUrl: './subscription-payment-method-add.scss',
})
export class SubscriptionPaymentMethodAdd {

  subsPaymentMethodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subsPaymentMethodService: SubscriptionPaymentMethod,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.subsPaymentMethodForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.subsPaymentMethodService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/subscription-payment-method']);

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

    const control = this.subsPaymentMethodForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
