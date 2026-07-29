import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-permission-type-add',
  imports: [],
  templateUrl: './user-permission-type-add.html',
  styleUrl: './user-permission-type-add.scss',
})
export class UserPermissionTypeAdd {

  userPermissionTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userPermissionTypeService: UserPermissionTypeService,
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

    this.userPermissionTypeService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/user-permission-type']);

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
