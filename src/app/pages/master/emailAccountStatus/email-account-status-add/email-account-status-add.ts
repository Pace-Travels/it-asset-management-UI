import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailAccountStatusService } from '../../../../core/services/master/email-account-status.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-email-account-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './email-account-status-add.html',
  styleUrl: './email-account-status-add.scss',
})
export class EmailAccountStatusAdd {

  emailAccStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailAccStatusService: EmailAccountStatusService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.emailAccStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.emailAccStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/email-account-status']);

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

    const control = this.emailAccStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
