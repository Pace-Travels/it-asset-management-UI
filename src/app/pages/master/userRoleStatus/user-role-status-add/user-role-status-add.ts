import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { UserRoleStatusEditService } from '../../../../core/services/master/user-role-status-edit.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-role-status-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './user-role-status-add.html',
  styleUrl: './user-role-status-add.scss',
})
export class UserRoleStatusAdd {

  userRoleStatusForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userRoleStatusService: UserRoleStatusEditService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.userRoleStatusForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.userRoleStatusForm.invalid) {

      this.userRoleStatusForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userRoleStatusForm.value.name,
      description: this.userRoleStatusForm.value.description

    };

    this.userRoleStatusService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/user-role-status']);

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

    const control = this.userRoleStatusForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
