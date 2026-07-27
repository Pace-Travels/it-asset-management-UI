import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetInformationCategory } from '../../../../core/services/master/asset-information-category';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-asset-information-category-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './asset-information-category-edit.html',
  styleUrl: './asset-information-category-edit.scss',
})
export class AssetInformationCategoryEdit {

  assetInfoCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assetInfoCategoryService: AssetInformationCategory,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  assetId!: number;

  ngOnInit() {

    this.assetInfoCategoryForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {

      this.assetId = Number(params['id']);

      if (this.assetId) {

        this.getAssetInfoData();

      }

    });

  }

  getAssetInfoData(): void {

    this.assetInfoCategoryService
      .getAssetInfoData(this.assetId)
      .subscribe({

        next: (response) => {
          console.log(response)
          if (response.success) {

            this.assetInfoCategoryForm.patchValue({

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

    if (this.assetInfoCategoryForm.invalid) {

      this.assetInfoCategoryForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.assetInfoCategoryForm.value.name,

      description: this.assetInfoCategoryForm.value.description

    };

    // Edit Mode
    if (this.assetId) {

      this.assetInfoCategoryService
        .update(this.assetId, payload)
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

      this.assetInfoCategoryService
        .add(payload)
        .subscribe({

          next: (response) => {

            if (response.success) {

              this.messageService.add({

                severity: 'success',

                summary: 'Success',

                detail: response.message

              });

              this.router.navigate(['/asset-info-status']);

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

    const control = this.assetInfoCategoryForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
