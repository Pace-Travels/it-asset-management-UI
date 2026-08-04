import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Permission } from '../../../../core/services/master/permission';
import { CommonModule, Location } from '@angular/common';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-permission-add',
  imports: [CommonModule, ValidationMessage, ReactiveFormsModule, PageHeader],
  templateUrl: './permission-add.html',
  styleUrl: './permission-add.scss',
})
export class PermissionAdd {

  userPermissionTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permissionService: Permission,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.userPermissionTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.userPermissionTypeForm.invalid) {

      this.userPermissionTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userPermissionTypeForm.value.name,
      description: this.userPermissionTypeForm.value.description

    };

    this.permissionService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/permission']);

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

    const control = this.userPermissionTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
