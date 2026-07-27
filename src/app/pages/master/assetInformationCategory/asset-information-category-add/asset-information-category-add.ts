import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AssetInformationCategory } from '../../../../core/services/master/asset-information-category';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-asset-information-category-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './asset-information-category-add.html',
  styleUrl: './asset-information-category-add.scss',
})
export class AssetInformationCategoryAdd {

  assetInfoCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assetInfoCategoryService: AssetInformationCategory,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.assetInfoCategoryForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.assetInfoCategoryService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/asset-info-status']);

        } else {

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
