import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SoftwareLicenseCategoryService } from '../../../../core/services/master/software-license-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-software-license-category-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './software-license-category-edit.html',
  styleUrl: './software-license-category-edit.scss',
})
export class SoftwareLicenseCategoryEdit {

  softewareLicCateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private softwareLicenseCategoryService: SoftwareLicenseCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  softwareLicenseCategoryId!: number;

  ngOnInit() {

    this.softewareLicCateForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.softwareLicenseCategoryId = Number(params['id']);

      if (this.softwareLicenseCategoryId) {

        this.getAssetInfoData();

      }

    });

  }

  getAssetInfoData(): void {

    this.softwareLicenseCategoryService
      .getByIdData(this.softwareLicenseCategoryId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.softewareLicCateForm.patchValue({

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

    if (this.softewareLicCateForm.invalid) {

      this.softewareLicCateForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.softewareLicCateForm.value.name,

      description: this.softewareLicCateForm.value.description

    };

    // Edit Mode
    if (this.softwareLicenseCategoryId) {

      this.softwareLicenseCategoryService
        .update(this.softwareLicenseCategoryId, payload)
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
                  '/software-license-category'
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

      this.softwareLicenseCategoryService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/software-license-category']);

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

    const control = this.softewareLicCateForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
