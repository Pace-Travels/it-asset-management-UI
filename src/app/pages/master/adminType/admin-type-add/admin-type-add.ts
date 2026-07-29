import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminTypeService } from '../../../../core/services/master/admin-type.service';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-admin-type-add',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './admin-type-add.html',
  styleUrl: './admin-type-add.scss',
})
export class AdminTypeAdd {

  adminTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminTypeService: AdminTypeService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.adminTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.adminTypeService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/admin-type']);

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

    const control = this.adminTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
