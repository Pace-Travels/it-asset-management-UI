import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerManagementStatusService } from '../../../../core/services/master/server-management-status.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-server-management-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './server-management-status-add.html',
  styleUrl: './server-management-status-add.scss',
})
export class ServerManagementStatusAdd {

  serveMangStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serveMangStatusService: ServerManagementStatusService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.serveMangStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.serveMangStatusForm.invalid) {

      this.serveMangStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.serveMangStatusForm.value.name,
      description: this.serveMangStatusForm.value.description

    };

    this.serveMangStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/server-mngt-status']);

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

    const control = this.serveMangStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
