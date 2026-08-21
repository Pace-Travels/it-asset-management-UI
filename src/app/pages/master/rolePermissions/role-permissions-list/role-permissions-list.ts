import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { RolePermissionsServices } from '../../../../core/services/master/role-permissions.services';

@Component({
  selector: 'app-role-permission-list',
  standalone: true,
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './role-permissions-list.html',
  styleUrl: './role-permissions-list.scss',
})
export class RolePermissionsList implements OnInit {

  tableData: any[] = [];
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;
  search = '';

  showDeleteDialog = false;
  selectedRolePermission: any = null;
  isDeleting = false;

  constructor(
    private router: Router,
    private rolePermissionService: RolePermissionsServices,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getRolePermissionList();
  }

  getRolePermissionList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.rolePermissionService
      .getList(payload)
      .subscribe({
        next: (response) => {
          this.loading = false;

          if (response?.success) {
            this.tableData = [...response.data];
            this.totalRecords = response.pagination?.totalRecords || 0;
            this.totalPages = response.pagination?.totalPages || 0;
            this.pageNumber = response.pagination?.currentPage || 1;
            this.pageSize = response.pagination?.pageSize || 10;
            this.cdr.detectChanges();
          }
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  searchRolePermission(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getRolePermissionList();
  }

  addRolePermission(): void {
    this.router.navigate(['/role-permission/add']);
  }

  editRolePermission(id: number): void {
    this.router.navigate(['/role-permission/update', id]);
  }

  openDeleteDialog(item: any): void {
    this.selectedRolePermission = item;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedRolePermission = null;
  }

  deleteRolePermission(): void {
    if (!this.selectedRolePermission) {
      return;
    }

    this.isDeleting = true;

    this.rolePermissionService
      .delete(this.selectedRolePermission.id)
      .subscribe({
        next: (response) => {
          this.isDeleting = false;

          if (response?.success) {
            this.closeDeleteDialog();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Role Permission deleted successfully'
            });

            this.getRolePermissionList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Failed to delete record'
            });
          }
        },
        error: (error) => {
          this.isDeleting = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Something went wrong.'
          });
        }
      });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageNumber = page;
    this.getRolePermissionList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getRolePermissionList();
  }

}