import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServerManagementCategoryService } from '../../../../core/services/master/server-management-category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-server-management-categor-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './server-management-categor-add.html',
  styleUrl: './server-management-categor-add.scss',
})
export class ServerManagementCategorAdd {

  serverMangCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serverMangCategoryService: ServerManagementCategoryService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.serverMangCategoryForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.serverMangCategoryService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/server-mngt-category']);

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

    const control = this.serverMangCategoryForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
