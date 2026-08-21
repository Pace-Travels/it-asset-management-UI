import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { MobileRechargeManagementServices } from '../../../../core/services/master/mobile-recharge-management.services';

@Component({
  selector: 'app-mobile-recharge-management-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './mobile-recharge-management-list.html',
  styleUrl: './mobile-recharge-management-list.scss',
})
export class MobileRechargeManagementList implements OnInit {

  constructor(
    private router: Router,
    private mobileRechargeService: MobileRechargeManagementServices,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getRechargeList();
  }

  getRechargeList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.mobileRechargeService
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

  searchRecharge(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getRechargeList();
  }

  addRecharge(): void {
    this.router.navigate(['/mobile-recharge-management/add']);
  }

  editRecharge(id: number): void {
    this.router.navigate(['/mobile-recharge-management/update', id]);
  }

  showDeleteDialog = false;
  selectedRecharge: any = null;
  isDeleting = false;

  openDeleteDialog(recharge: any): void {
    this.selectedRecharge = recharge;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedRecharge = null;
  }

  deleteRecharge(): void {
    if (!this.selectedRecharge) {
      return;
    }

    this.isDeleting = true;

    this.mobileRechargeService
      .delete(this.selectedRecharge.id)
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

            this.getRechargeList();
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
    this.getRechargeList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getRechargeList();
  }

}