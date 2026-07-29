import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminTypeService } from '../../../../core/services/master/admin-type.service';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-admin-type-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './admin-type-edit.html',
  styleUrl: './admin-type-edit.scss',
})
export class AdminTypeEdit {
  
  adminTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminTypeService: AdminTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  adminTypeId!: number;

  ngOnInit() {

    this.adminTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.adminTypeId = Number(params['id']);

      if (this.adminTypeId) {

        this.getAdminTypeData();

      }

    });

  }

  getAdminTypeData(): void {

    this.adminTypeService
      .getByIdData(this.adminTypeId)
      .subscribe({

        next: (response) => {

          if (response.success) {

            this.adminTypeForm.patchValue({

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

    if (this.adminTypeForm.invalid) {

      this.adminTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.adminTypeForm.value.name,

      description: this.adminTypeForm.value.description

    };

    // Edit Mode
    if (this.adminTypeId) {

      this.adminTypeService
        .update(this.adminTypeId, payload)
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
                  '/admin-type'
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

      this.adminTypeService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/admin-type']);

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

    const control = this.adminTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }


}
