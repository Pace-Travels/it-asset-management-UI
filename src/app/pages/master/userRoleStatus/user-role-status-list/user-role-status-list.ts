import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleStatusEditService } from '../../../../core/services/master/user-role-status-edit.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-user-role-status-list',
  imports: [CommonModule, TableToolbar, ConfirmationDialog, EmptyState, Pagination, PageHeader],
  templateUrl: './user-role-status-list.html',
  styleUrl: './user-role-status-list.scss',
})
export class UserRoleStatusList {

  constructor(private router: Router, private userRoleStatusService: UserRoleStatusEditService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  userRoleStatus: any[] = [];

  filteredUserRoleStatus: any[] = [];

  ngOnInit(): void {

    this.getUserRoleStatusList();

  }


  getUserRoleStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.userRoleStatusService
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

  searchUserRoleStatus(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getUserRoleStatusList();

  }

  addUserRoleStatus() {

    this.router.navigate(['/user-role-status/add']);

  }
  editUserRoleStatus(id: number): void {

    this.router.navigate(['/user-role-status/update', id]);

  }

  showDeleteDialog = false;

  selectedUserRoleStatus: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedUserRoleStatus = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedUserRoleStatus = null;

  }

  deleteUserRoleStatus(): void {

    if (!this.selectedUserRoleStatus) {
      return;
    }

    this.isDeleting = true;

    this.userRoleStatusService
      .delete(this.selectedUserRoleStatus.id)
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
            this.getUserRoleStatusList();

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

    this.getUserRoleStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getUserRoleStatusList();

  }

}
