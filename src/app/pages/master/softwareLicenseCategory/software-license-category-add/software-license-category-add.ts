import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { SoftwareLicenseCategoryService } from '../../../../core/services/master/software-license-category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-software-license-category-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './software-license-category-add.html',
  styleUrl: './software-license-category-add.scss',
})
export class SoftwareLicenseCategoryAdd {

  softwareLicenseCateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private softwareLicenseCategoryService: SoftwareLicenseCategoryService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.softwareLicenseCateForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.softwareLicenseCateForm.invalid) {

      this.softwareLicenseCateForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.softwareLicenseCateForm.value.name,
      description: this.softwareLicenseCateForm.value.description

    };

    this.softwareLicenseCategoryService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/software-license-category']);

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

    const control = this.softwareLicenseCateForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
