import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminStatusService } from '../../../../core/services/master/admin-status.service';

@Component({
  selector: 'app-admin-status-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, Pagination, TableToolbar],
  templateUrl: './admin-status-list.html',
  styleUrl: './admin-status-list.scss',
})
export class AdminStatusList {

  constructor(private router: Router, private adminStatusService: AdminStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  adminStatus: any[] = [];

  filteredAdminStatus: any[] = [];

  ngOnInit(): void {

    this.getAdminStatusList();

  }


  getAdminStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.adminStatusService
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

  searchAdminStatus(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getAdminStatusList();

  }

  addAdminStatus() {

    this.router.navigate(['/admin-status/add']);

  }
  editAdminStatus(id: number): void {

    this.router.navigate(['/admin-status/update', id]);

  }

  showDeleteDialog = false;

  selectedAdminStatus: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedAdminStatus = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedAdminStatus = null;

  }

  deleteAdminStatus(): void {

    if (!this.selectedAdminStatus) {
      return;
    }

    this.isDeleting = true;

    this.adminStatusService
      .delete(this.selectedAdminStatus.id)
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
            this.getAdminStatusList();

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

    this.getAdminStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getAdminStatusList();

  }

}
