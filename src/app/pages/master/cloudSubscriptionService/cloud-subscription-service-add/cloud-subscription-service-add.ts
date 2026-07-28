import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { CloudSubscriptionServiceService } from '../../../../core/services/master/cloud-subscription-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cloud-subscription-service-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './cloud-subscription-service-add.html',
  styleUrl: './cloud-subscription-service-add.scss',
})
export class CloudSubscriptionServiceAdd {

  cloudSubsServiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cloudSubsServiceService: CloudSubscriptionServiceService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.cloudSubsServiceForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.cloudSubsServiceForm.invalid) {

      this.cloudSubsServiceForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.cloudSubsServiceForm.value.name,
      description: this.cloudSubsServiceForm.value.description

    };

    this.cloudSubsServiceService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/cloud-subs-service']);

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

    const control = this.cloudSubsServiceForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
