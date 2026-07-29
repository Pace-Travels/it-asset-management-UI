import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeService } from '../../../../core/services/master/user-type.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';

@Component({
  selector: 'app-user-type-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './user-type-add.html',
  styleUrl: './user-type-add.scss',
})
export class UserTypeAdd {

  userTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userTypeService: UserTypeService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.userTypeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['']
    });

  }

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.userTypeForm.invalid) {

      this.userTypeForm.markAllAsTouched();

      return;

    }

    const payload = {

      name: this.userTypeForm.value.name,
      description: this.userTypeForm.value.description

    };

    this.userTypeService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/user-type']);

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

    const control = this.userTypeForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

}
