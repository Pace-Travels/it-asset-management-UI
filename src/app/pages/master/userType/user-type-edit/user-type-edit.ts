import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeService } from '../../../../core/services/master/user-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-user-type-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './user-type-edit.html',
  styleUrl: './user-type-edit.scss',
})
export class UserTypeEdit {

  userTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userTypeService: UserTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  userTypeId!: number;

  ngOnInit() {

    this.userTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.userTypeId = Number(params['id']);

      if (this.userTypeId) {

        this.getRenewalRemTypeData();

      }

    });

  }

  getRenewalRemTypeData(): void {

    this.userTypeService
      .getByIdData(this.userTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.userTypeForm.patchValue({

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

    if (this.userTypeForm.invalid) {

      this.userTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userTypeForm.value.name,

      description: this.userTypeForm.value.description

    };

    // Edit Mode
    if (this.userTypeId) {

      this.userTypeService
        .update(this.userTypeId, payload)
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
                  '/user-type'
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

      this.userTypeService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/user-type']);

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

    const control = this.userTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
