import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRoleStatusEditService } from '../../../../core/services/master/user-role-status-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-user-role-status-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './user-role-status-edit.html',
  styleUrl: './user-role-status-edit.scss',
})
export class UserRoleStatusEdit {

  userRoleStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userRoleStatusService: UserRoleStatusEditService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  renewalRemTypeId!: number;

  ngOnInit() {

    this.userRoleStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.renewalRemTypeId = Number(params['id']);

      if (this.renewalRemTypeId) {

        this.getRenewalRemTypeData();

      }

    });

  }

  getRenewalRemTypeData(): void {

    this.userRoleStatusService
      .getByIdData(this.renewalRemTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.userRoleStatusForm.patchValue({

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

    if (this.userRoleStatusForm.invalid) {

      this.userRoleStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userRoleStatusForm.value.name,

      description: this.userRoleStatusForm.value.description

    };

    // Edit Mode
    if (this.renewalRemTypeId) {

      this.userRoleStatusService
        .update(this.renewalRemTypeId, payload)
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
                  '/user-role-status'
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

      this.userRoleStatusService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/user-role-status']);

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

    const control = this.userRoleStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
