import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { SubscriptionService } from '../../../../core/services/master/subscription.service';

@Component({
  selector: 'app-subscription-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.scss',
})
export class SubscriptionList implements OnInit {

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSubscriptionList();
  }

  getSubscriptionList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.subscriptionService
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

  searchSubscription(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getSubscriptionList();
  }

  addSubscription(): void {
    this.router.navigate(['/subscription/add']);
  }

  editSubscription(id: number): void {
    this.router.navigate(['/subscription/update', id]);
  }

  showDeleteDialog = false;
  selectedSubscription: any = null;
  isDeleting = false;

  openDeleteDialog(subscription: any): void {
    this.selectedSubscription = subscription;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedSubscription = null;
  }

  deleteSubscription(): void {
    if (!this.selectedSubscription) {
      return;
    }

    this.isDeleting = true;

    this.subscriptionService
      .delete(this.selectedSubscription.id)
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

            this.getSubscriptionList();
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
    this.getSubscriptionList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getSubscriptionList();
  }

}