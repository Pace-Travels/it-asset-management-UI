import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserPermissionTypeService } from '../../../../core/services/master/user-permission-type.service';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-user-permission-type-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './user-permission-type-edit.html',
  styleUrl: './user-permission-type-edit.scss',
})
export class UserPermissionTypeEdit {

  userPermissionTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userPermissionTypeService: UserPermissionTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  userPermissionTypeId!: number;

  ngOnInit() {

    this.userPermissionTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.userPermissionTypeId = Number(params['id']);

      if (this.userPermissionTypeId) {

        this.getuserPermissionTypeData();

      }

    });

  }

  getuserPermissionTypeData(): void {

    this.userPermissionTypeService
      .getByIdData(this.userPermissionTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.userPermissionTypeForm.patchValue({

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

    if (this.userPermissionTypeForm.invalid) {

      this.userPermissionTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userPermissionTypeForm.value.name,

      description: this.userPermissionTypeForm.value.description

    };

    // Edit Mode
    if (this.userPermissionTypeId) {

      this.userPermissionTypeService
        .update(this.userPermissionTypeId, payload)
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
                  '/user-permission-type'
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

      this.userPermissionTypeService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/user-permission-type']);

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

    const control = this.userPermissionTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }
  
}
