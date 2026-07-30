import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionReminderType } from '../../../../core/services/master/subscription-reminder-type';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-subscription-reminder-type-add',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './subscription-reminder-type-add.html',
  styleUrl: './subscription-reminder-type-add.scss',
})
export class SubscriptionReminderTypeAdd {

  subsReminderTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subsReminderTypeService: SubscriptionReminderType,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.subsReminderTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.subsReminderTypeService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/subscription-reminder-type']);

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

    const control = this.subsReminderTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
