import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from '../../../../core/services/master/department';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-department-add',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessage, PageHeader],
  templateUrl: './department-add.html',
  styleUrl: './department-add.scss',
})
export class DepartmentAdd {

  departmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: Department,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.departmentForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
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

    this.departmentService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/department']);

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

    const control = this.departmentForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }
}
