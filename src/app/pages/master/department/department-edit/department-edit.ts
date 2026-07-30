import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { Department } from '../../../../core/services/master/department.js';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message.js';
import { PageHeader } from '../../../shared/components/page-header/page-header.js';

@Component({
  selector: 'app-department-edit',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './department-edit.html',
  styleUrl: './department-edit.scss',
})
export class DepartmentEdit {

  departmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: Department,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  departmentId!: number;

  ngOnInit() {

    this.departmentForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.departmentId = Number(params['id']);

      if (this.departmentId) {

        this.getDepartmentData();

      }

    });

  }

  getDepartmentData(): void {

    this.departmentService
      .getByIdData(this.departmentId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.departmentForm.patchValue({

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

    if (this.departmentForm.invalid) {

      this.departmentForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.departmentForm.value.name,

      description: this.departmentForm.value.description

    };

    // Edit Mode
    if (this.departmentId) {

      this.departmentService
        .update(this.departmentId, payload)
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
                  '/department'
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

      this.departmentService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/department']);

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

    const control = this.departmentForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }
}
