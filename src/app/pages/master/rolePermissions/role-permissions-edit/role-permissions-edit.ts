import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { RolePermissionsServices } from '../../../../core/services/master/role-permissions.services';

@Component({
  selector: 'app-role-permission-edit',
  standalone: true,
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './role-permissions-edit.html',
  styleUrl: './role-permissions-edit.scss',
})
export class RolePermissionsEdit implements OnInit {

  rolePermissionForm!: FormGroup;
  rolePermissionId!: number;
  submitted = false;

  rolesList: any[] = [];
  menusList: any[] = [];
  permissionsList: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private rolePermissionService: RolePermissionsServices,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.rolePermissionForm = this.fb.group({
      roleId: [null, Validators.required],
      menuId: [null, Validators.required],
      permissionId: [null, Validators.required],
      isActive: [true, Validators.required]
    });

    this.getDropdowns();

    this.route.params.subscribe(params => {
      this.rolePermissionId = Number(params['id']);
      if (this.rolePermissionId) {
        this.getRolePermissionData();
      }
    });
  }

  getDropdowns(): void {
    this.rolePermissionService.getDropdownData().subscribe({
      next: (res) => {
        if (res?.success) {
          this.rolesList = res.data.roles || [];
          this.menusList = res.data.menus || [];
          this.permissionsList = res.data.permissions || [];
        }
      },
      error: (err) => console.error(err)
    });
  }

  getRolePermissionData(): void {
    this.rolePermissionService
      .getByIdData(this.rolePermissionId)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            const data = response.data;
            this.rolePermissionForm.patchValue({
              roleId: data.roleId,
              menuId: data.menuId,
              permissionId: data.permissionId,
              isActive: data.isActive
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Failed to load details.'
          });
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.rolePermissionForm.invalid) {
      this.rolePermissionForm.markAllAsTouched();
      return;
    }

    const payload = this.rolePermissionForm.value;

    this.rolePermissionService
      .update(this.rolePermissionId, payload)
      .subscribe({
        next: (response) => {
          if (response?.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Role Permission updated successfully'
            });

            setTimeout(() => {
              this.router.navigate(['/role-permission']);
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Failed to update record'
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

  goBack() {
    this.location.back();
  }

  isInvalid(controlName: string): boolean {
    const control = this.rolePermissionForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}