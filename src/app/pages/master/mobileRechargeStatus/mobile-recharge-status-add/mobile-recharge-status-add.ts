import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MobileRechargeStatusService } from '../../../../core/services/master/mobile-recharge-status.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-mobile-recharge-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './mobile-recharge-status-add.html',
  styleUrl: './mobile-recharge-status-add.scss',
})
export class MobileRechargeStatusAdd {

  mobileRechargeStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monitoringBackupStatusService: MobileRechargeStatusService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.mobileRechargeStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.mobileRechargeStatusForm.invalid) {

      this.mobileRechargeStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.mobileRechargeStatusForm.value.name,
      description: this.mobileRechargeStatusForm.value.description

    };

    this.monitoringBackupStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/mobile-recharge-status']);

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

    const control = this.mobileRechargeStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
