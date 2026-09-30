import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../core/services/auths/admin.service';
import { CommonModule, Location } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { UserRoleService } from '../../../../core/services/master/user-role.service';
import { Department } from '../../../../core/services/master/department';
import { AdminStatusService } from '../../../../core/services/master/admin-status.service';
import { UserTypeService } from '../../../../core/services/master/user-type.service';

@Component({
  selector: 'app-admin-edit',
  imports: [CommonModule, PageHeader, ReactiveFormsModule, ValidationMessage],
  templateUrl: './admin-edit.html',
  styleUrl: './admin-edit.scss',
})
export class AdminEdit {
  adminForm!: FormGroup;
  adminId!: number;
  submitted = false;
  userRoles: any[] = [];
  userTypes: any[] = [];
  departments: any[] = [];
  adminStatuses: any[] = [];
  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userRoleService: UserRoleService,
    private departmentService: Department,
    private adminStatusService: AdminStatusService,
    private userTypeService: UserTypeService
  ) { }

  ngOnInit() {
    this.adminForm = this.fb.group({
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+=\-])[A-Za-z\d@$!%*?&.#^()_+=\-]{12}$/)]],
      userRoleId: [null, Validators.required],
      userTypeId: [null, Validators.required],
      departmentId: [null, Validators.required],
      adminStatusId: [null, Validators.required]
    });

    this.loadDropdowns();

    this.route.params.subscribe(params => {
      this.adminId = Number(params['id']);
      if (this.adminId) {
        this.getAdminData();
      }
    });
  }

  loadDropdowns(): void {
    this.getUserRoles();
    this.getUserTypes();
    this.getDepartments();
    this.getAdminStatuses();
  }

  getUserRoles(): void {
    this.userRoleService.fetchAll().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.userRoles = response.data;
        }
      },
      error: (error) => console.error(error)
    });
  }

  getUserTypes(): void {
    this.userTypeService.fetchAll().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.userTypes = response.data;
        }
      },
      error: (error) => console.error(error)
    });
  }

  getDepartments(): void {
    this.departmentService.fetchAll().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.departments = response.data;
        }
      },
      error: (error) => console.error(error)
    });
  }

  getAdminStatuses(): void {
    this.adminStatusService.fetchAll().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.adminStatuses = response.data;
        }
      },
      error: (error) => console.error(error)
    });
  }

  getAdminData(): void {
    this.adminService.getByIdData(this.adminId).subscribe({
      next: (response) => {
        if (response.success) {
          this.adminForm.patchValue({
            employeeCode: response.data.employeeCode,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            mobileNumber: response.data.mobileNumber,
            password: response.data.password,
            userRoleId: response.data.userRoleId,
            userTypeId: response.data.userTypeId,
            departmentId: response.data.departmentId,
            adminStatusId: response.data.adminStatusId
          });
        }
      },
      error: (error) => console.error(error)
    });
  }

  save(): void {
    this.submitted = true;
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }

    const payload = this.adminForm.value;
    
    this.adminService.update(this.adminId, payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message || 'Something went wrong.' });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  isInvalid(controlName: string): boolean {
    const control = this.adminForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }
}
