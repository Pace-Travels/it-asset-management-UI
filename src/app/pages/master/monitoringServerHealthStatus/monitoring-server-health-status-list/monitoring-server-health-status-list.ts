import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Router } from '@angular/router';
import { MonitoringServerHealthStatusService } from '../../../../core/services/master/monitoring-server-health-status.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-monitoring-server-health-status-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, Pagination, TableToolbar],
  templateUrl: './monitoring-server-health-status-list.html',
  styleUrl: './monitoring-server-health-status-list.scss',
})
export class MonitoringServerHealthStatusList {

  constructor(private router: Router, private monitoringBsckupStatusService: MonitoringServerHealthStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  monitoringServerHelthStatus: any[] = [];

  filteredMonitoringServerHelthStatus: any[] = [];

  ngOnInit(): void {

    this.getMonitoringServerHelthStatusList();

  }


  getMonitoringServerHelthStatusList(): void {

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

  searchMonitoringServeHlthStatus(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getMonitoringServerHelthStatusList();

  }

  addMonitoringServeHlthStatus() {

    this.router.navigate(['/monitoring-server-health-status/add']);

  }
  editMonitoringServeHlthStatus(id: number): void {

    this.router.navigate(['/monitoring-server-health-status/update', id]);

  }

  showDeleteDialog = false;

  selectedMonitoringServHlthStatus: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedMonitoringServHlthStatus = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedMonitoringServHlthStatus = null;

  }

  deleteMonitoringServeHlthStatus(): void {

    if (!this.selectedMonitoringServHlthStatus) {
      return;
    }

    this.isDeleting = true;

    this.monitoringBsckupStatusService
      .delete(this.selectedMonitoringServHlthStatus.id)
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
            this.getMonitoringServerHelthStatusList();

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

    this.getMonitoringServerHelthStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getMonitoringServerHelthStatusList();

  }

}
