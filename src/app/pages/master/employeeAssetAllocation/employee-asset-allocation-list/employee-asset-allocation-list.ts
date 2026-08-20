import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmployeeAssetAllocationService } from '../../../../core/services/master/employee-asset-allocation.service';

@Component({
  selector: 'app-employee-software-license-allocation-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './employee-asset-allocation-list.html',
  styleUrl: './employee-asset-allocation-list.scss',
})
export class EmployeeSoftwareLicenseAllocationList implements OnInit {

  constructor(
    private router: Router,
    private allocationService: EmployeeAssetAllocationService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllocationList();
  }

  getAllocationList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.allocationService
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

  searchAllocation(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getAllocationList();
  }

  addAllocation(): void {
    this.router.navigate(['/employee-software-license-allocation/add']);
  }

  editAllocation(id: number): void {
    this.router.navigate(['/employee-software-license-allocation/update', id]);
  }

  showDeleteDialog = false;
  selectedAllocation: any = null;
  isDeleting = false;

  openDeleteDialog(allocation: any): void {
    this.selectedAllocation = allocation;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedAllocation = null;
  }

  deleteAllocation(): void {
    if (!this.selectedAllocation) {
      return;
    }

    this.isDeleting = true;

    this.allocationService
      .delete(this.selectedAllocation.id)
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

            this.getAllocationList();
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
    this.getAllocationList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getAllocationList();
  }

}