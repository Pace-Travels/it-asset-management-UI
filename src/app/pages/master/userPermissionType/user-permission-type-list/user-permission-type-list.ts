import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserPermissionTypeService } from '../../../../core/services/master/user-permission-type.service';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-user-permission-type-list',
  imports: [CommonModule, EmptyState, ConfirmationDialog, TableToolbar, Pagination, PageHeader ],
  templateUrl: './user-permission-type-list.html',
  styleUrl: './user-permission-type-list.scss',
})
export class UserPermissionTypeList {

  constructor(private router: Router, private userPermissionTypeService: UserPermissionTypeService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  userPermissionType: any[] = [];

  filteredUserPermissionType: any[] = [];

  ngOnInit(): void {

    this.getUserpermissionType();

  }


  getUserpermissionType(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.userPermissionTypeService
      .getList(payload)
      .subscribe({

        next: (response) => {

          this.tableData = [...response.data];

          this.loading = false;

          if (response.success) {

            this.tableData = [...response.data];


            this.totalRecords = response.pagination.totalRecords;

            this.totalPages = response.pagination.totalPages;

            this.pageNumber = response.pagination.currentPage;

            this.pageSize = response.pagination.pageSize;

            this.cdr.detectChanges();
          }

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  // searchAsset(value: string) {
  //   const search = value.toLowerCase();

  //   this.filteredAssets = this.assets.filter(asset =>
  //     asset.name.toLowerCase().includes(search) ||
  //     asset.description.toLowerCase().includes(search)
  //   );

  // }

  searchUserPermissionType(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getUserpermissionType();

  }

  addUserPermissionType() {

    this.router.navigate(['/user-permission-type/add']);

  }
  editUserPermissionType(id: number): void {

    this.router.navigate(['/user-permission-type/update', id]);

  }

  showDeleteDialog = false;

  selectedUserPermissionType: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedUserPermissionType = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedUserPermissionType = null;

  }

  deleteUserPermissionType(): void {

    if (!this.selectedUserPermissionType) {
      return;
    }

    this.isDeleting = true;

    this.userPermissionTypeService
      .delete(this.selectedUserPermissionType.id)
      .subscribe({

        next: (response) => {

          this.isDeleting = false;

          if (response.success) {

            // Close Dialog
            this.closeDeleteDialog();

            // Success Toast
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            // Refresh List
            this.getUserpermissionType();

          } else {

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message
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


  // =====================pagination ========================

  tableData: any[] = [];

  loading = false;

  pageNumber = 1;

  pageSize = 10;

  totalRecords = 0;

  totalPages = 0;

  search = '';


  onPageChange(page: number): void {

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageNumber = page;

    this.getUserpermissionType();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getUserpermissionType();

  }
}
