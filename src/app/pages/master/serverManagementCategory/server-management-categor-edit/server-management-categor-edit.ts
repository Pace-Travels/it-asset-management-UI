import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerManagementCategoryService } from '../../../../core/services/master/server-management-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-server-management-categor-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './server-management-categor-edit.html',
  styleUrl: './server-management-categor-edit.scss',
})
export class ServerManagementCategorEdit {

  serverMangCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serverMangCategoryService: ServerManagementCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  serveMangCategoryId!: number;

  ngOnInit() {

    this.serverMangCategoryForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.serveMangCategoryId = Number(params['id']);

      if (this.serveMangCategoryId) {

        this.getAssetInfoData();

      }

    });

  }

  getAssetInfoData(): void {

    this.serverMangCategoryService
      .getAssetInfoData(this.serveMangCategoryId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.serverMangCategoryForm.patchValue({

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

    if (this.serverMangCategoryForm.invalid) {

      this.serverMangCategoryForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.serverMangCategoryForm.value.name,

      description: this.serverMangCategoryForm.value.description

    };

    // Edit Mode
    if (this.serveMangCategoryId) {

      this.serverMangCategoryService
        .update(this.serveMangCategoryId, payload)
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
                  '/server-mngt-category'
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

      this.serverMangCategoryService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/server-mngt-category']);

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

    const control = this.serverMangCategoryForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
