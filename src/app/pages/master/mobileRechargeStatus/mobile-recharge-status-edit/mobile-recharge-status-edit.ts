import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MobileRechargeStatusService } from '../../../../core/services/master/mobile-recharge-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-mobile-recharge-status-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './mobile-recharge-status-edit.html',
  styleUrl: './mobile-recharge-status-edit.scss',
})
export class MobileRechargeStatusEdit {

  mobileRechargeStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mobileRechargeStatusService: MobileRechargeStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  mobileRechargeStatusId!: number;

  ngOnInit() {

    this.mobileRechargeStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.mobileRechargeStatusId = Number(params['id']);

      if (this.mobileRechargeStatusId) {

        this.getMobileRechargeStatusData();

      }

    });

  }

  getMobileRechargeStatusData(): void {

    this.mobileRechargeStatusService
      .getByIdData(this.mobileRechargeStatusId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.mobileRechargeStatusForm.patchValue({

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

    if (this.mobileRechargeStatusForm.invalid) {

      this.mobileRechargeStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.mobileRechargeStatusForm.value.name,

      description: this.mobileRechargeStatusForm.value.description

    };

    // Edit Mode
    if (this.mobileRechargeStatusId) {

      this.mobileRechargeStatusService
        .update(this.mobileRechargeStatusId, payload)
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
                  '/asset-info-status'
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

      this.mobileRechargeStatusService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/mobile-recharge-status']);

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

    const control = this.mobileRechargeStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
