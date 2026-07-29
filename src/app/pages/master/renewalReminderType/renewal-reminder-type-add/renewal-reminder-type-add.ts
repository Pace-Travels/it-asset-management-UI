import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { RenewalReminderTypeService } from '../../../../core/services/master/renewal-reminder-type.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-renewal-reminder-type-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './renewal-reminder-type-add.html',
  styleUrl: './renewal-reminder-type-add.scss',
})
export class RenewalReminderTypeAdd {

  renewalRemTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private renewalRemTypeService: RenewalReminderTypeService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.renewalRemTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.renewalRemTypeForm.invalid) {

      this.renewalRemTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.renewalRemTypeForm.value.name,
      description: this.renewalRemTypeForm.value.description

    };

    this.renewalRemTypeService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/renewal-reminder-type']);

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

    const control = this.renewalRemTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
