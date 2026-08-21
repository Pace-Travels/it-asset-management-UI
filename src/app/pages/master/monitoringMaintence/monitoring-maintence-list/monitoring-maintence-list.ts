import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { MonitoringMaintenceServices } from '../../../../core/services/master/monitoring-maintence.services';

@Component({
  selector: 'app-monitoring-maintenance-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './monitoring-maintence-list.html',
  styleUrl: './monitoring-maintence-list.scss',
})
export class MonitoringMaintenceList implements OnInit {

  constructor(
    private router: Router,
    private maintenanceService: MonitoringMaintenceServices,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getMaintenanceList();
  }

  getMaintenanceList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.maintenanceService
      .getList(payload)
      .subscribe({
        next: (response) => {
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

  searchMaintenance(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getMaintenanceList();
  }

  addMaintenance(): void {
    this.router.navigate(['/monitoring-maintenance/add']);
  }

  editMaintenance(id: number): void {
    this.router.navigate(['/monitoring-maintenance/update', id]);
  }

  showDeleteDialog = false;
  selectedMaintenance: any = null;
  isDeleting = false;

  openDeleteDialog(item: any): void {
    this.selectedMaintenance = item;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedMaintenance = null;
  }

  deleteMaintenance(): void {
    if (!this.selectedMaintenance) {
      return;
    }

    this.isDeleting = true;

    this.maintenanceService
      .delete(this.selectedMaintenance.id)
      .subscribe({
        next: (response) => {
          this.isDeleting = false;

          if (response.success) {
            this.closeDeleteDialog();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            this.getMaintenanceList();
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
    this.getMaintenanceList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getMaintenanceList();
  }

}