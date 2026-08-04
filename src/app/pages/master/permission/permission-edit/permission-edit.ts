import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Permission } from '../../../../core/services/master/permission';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-permission-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './permission-edit.html',
  styleUrl: './permission-edit.scss',
})
export class PermissionEdit {

  

  permissionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permissionService: Permission,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  permissionId!: number;

  ngOnInit() {

    this.permissionForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.permissionId = Number(params['id']);

      if (this.permissionId) {

        this.getuserPermissionTypeData();

      }

    });

  }

  getuserPermissionTypeData(): void {

    this.permissionService
      .getByIdData(this.permissionId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.permissionForm.patchValue({

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

    if (this.permissionForm.invalid) {

      this.permissionForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.permissionForm.value.name,

      description: this.permissionForm.value.description

    };

    // Edit Mode
    if (this.permissionId) {

      this.permissionService
        .update(this.permissionId, payload)
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
                  '/permission'
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

      this.permissionService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/permission']);

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

    const control = this.permissionForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
