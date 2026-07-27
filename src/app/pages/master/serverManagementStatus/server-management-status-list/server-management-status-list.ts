import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { MessageService } from 'primeng/api';
import { ServerManagementStatusService } from '../../../../core/services/master/server-management-status.service';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-server-management-status-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, Pagination, TableToolbar],
  templateUrl: './server-management-status-list.html',
  styleUrl: './server-management-status-list.scss',
})
export class ServerManagementStatusList {

  constructor(private router: Router, private serverMangStatusService: ServerManagementStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  serverMangStatus: any[] = [];

  filteredServerMangStatus: any[] = [];

  ngOnInit(): void {

    this.getServerMangStatusList();

  }


  getServerMangStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    console.log(payload);

    this.serverMangStatusService
      .getList(payload)
      .subscribe({

        next: (response) => {

          console.log('Current Page:', response.pagination.currentPage);
          console.table(response.data);
          this.tableData = [...response.data];

          console.log(this.tableData);


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

  searchServerMangStatus(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getServerMangStatusList();

  }

  addServerMangStatus() {

    this.router.navigate(['/server-mngt-status/add']);

  }
  editServerMangStatusStatus(id: number): void {

    this.router.navigate(['/server-mngt-status/update', id]);

  }

  showDeleteDialog = false;

  selectedServerMangStatus: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedServerMangStatus = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedServerMangStatus = null;

  }

  deleteserverMangStatus(): void {

    if (!this.selectedServerMangStatus) {
      return;
    }

    this.isDeleting = true;

    this.serverMangStatusService
      .delete(this.selectedServerMangStatus.id)
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
            this.getServerMangStatusList();

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

    this.getServerMangStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getServerMangStatusList();

  }

}
