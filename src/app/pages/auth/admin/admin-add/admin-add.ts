import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../core/services/auths/admin.service';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { UserRoleStatusEditService } from '../../../../core/services/master/user-role-status-edit.service';
import { Department } from '../../../../core/services/master/department';
import { AdminStatusService } from '../../../../core/services/master/admin-status.service';
import { UserTypeService } from '../../../../core/services/master/user-type.service';

@Component({
  selector: 'app-admin-add',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './admin-add.html',
  styleUrl: './admin-add.scss',
})
export class AdminAdd {


  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private messageService: MessageService,
    private userRoleStatusService: UserRoleStatusEditService,
    private departmentService: Department,
    private adminStatusService: AdminStatusService,
    private userTypeServie: UserTypeService
  ) { }

  ngOnInit() {

    this.adminForm = this.fb.group({

      employeeCode: ['', Validators.required],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      mobileNumber: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+=\-])[A-Za-z\d@$!%*?&.#^()_+=\-]{12}$/
          )
        ]
      ],

      userRoleId: [
        null,
        Validators.required
      ],

      userTypeId: [
        null,
        Validators.required
      ],

      departmentId: [
        null,
        Validators.required
      ],

      adminStatusId: [
        null,
        Validators.required
      ]

    });

    this.loadDropdowns();

    console.log(this.adminForm.valid);

    Object.keys(this.adminForm.controls).forEach((key: string) => {

      const control = this.adminForm.get(key);

      console.log(
        key,
        'Value :', control?.value,
        'Valid :', control?.valid,
        'Errors :', control?.errors
      );

    });

  }


  userRoles: any[] = [];

  userTypes: any[] = [];

  departments: any[] = [];

  adminStatuses: any[] = [];

  submitted = false;

  save(): void {

    this.submitted = true;

    if (this.adminForm.invalid) {

      this.adminForm.markAllAsTouched();

      return;

    }

    const payload = this.adminForm.value;

    this.adminService.add(payload).subscribe({

      next: (response) => {

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });
          this.router.navigate(['/admin']);

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

    const control = this.adminForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );

  }

  loadDropdowns(): void {

    this.getUserRoles();

    this.getUserTypes();

    this.getDepartments();

    this.getAdminStatuses();

  }

  getUserRoles(): void {

    this.userRoleStatusService.fetchAll().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.userTypes = response.data;

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  getAdminStatuses(): void {

    this.adminStatusService.fetchAll().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.adminStatuses = response.data;

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  getDepartments(): void {

    this.departmentService.fetchAll().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.departments = response.data;

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  getUserTypes(): void {

    this.userTypeServie.fetchAll().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.userTypes = response.data;

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
