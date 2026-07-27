import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MonitoringBackupStatusService } from '../../../../core/services/master/monitoring-backup-status.service';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-monitoring-backup-status-list',
  imports: [CommonModule, PageHeader, EmptyState, ConfirmationDialog, TableToolbar, Pagination],
  templateUrl: './monitoring-backup-status-list.html',
  styleUrl: './monitoring-backup-status-list.scss',
})
export class MonitoringBackupStatusList {

  constructor(private router: Router, private monitoringBsckupStatusService: MonitoringBackupStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  monitoringBackupStatus: any[] = [];

  filteredMonitoringBackupStatus: any[] = [];

  ngOnInit(): void {

    this.getMonitoringBackupStatusList();

  }


  getMonitoringBackupStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    console.log(payload);

    this.monitoringBsckupStatusService
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

  searchMonitoringBackStatus(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getMonitoringBackupStatusList();

  }

  addMonitoringBackStatus() {

    this.router.navigate(['/monitoring-backup-status/add']);

  }
  editMonitoringBackStatus(id: number): void {

    this.router.navigate(['/monitoring-backup-status/update', id]);

  }

  showDeleteDialog = false;

  selectedMonitoringBackStatus: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedMonitoringBackStatus = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedMonitoringBackStatus = null;

  }

  deleteMonitoringBackStatus(): void {

    if (!this.selectedMonitoringBackStatus) {
      return;
    }

    this.isDeleting = true;

    this.monitoringBsckupStatusService
      .delete(this.selectedMonitoringBackStatus.id)
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
            this.getMonitoringBackupStatusList();

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

    this.getMonitoringBackupStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getMonitoringBackupStatusList();

  }

}
