import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmailAccountManagementService } from '../../../../core/services/master/email-account-management.service';

@Component({
  selector: 'app-email-account-management-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './email-account-management-list.html',
  styleUrl: './email-account-management-list.scss',
})
export class EmailAccountManagementList implements OnInit {

  constructor(
    private router: Router,
    private emailAccountService: EmailAccountManagementService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getEmailAccountList();
  }

  getEmailAccountList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.emailAccountService
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

  searchEmailAccount(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getEmailAccountList();
  }

  addEmailAccount(): void {
    this.router.navigate(['/email-account-management/add']);
  }

  editEmailAccount(id: number): void {
    this.router.navigate(['/email-account-management/update', id]);
  }

  showDeleteDialog = false;
  selectedEmailAccount: any = null;
  isDeleting = false;

  openDeleteDialog(account: any): void {
    this.selectedEmailAccount = account;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedEmailAccount = null;
  }

  deleteEmailAccount(): void {
    if (!this.selectedEmailAccount) {
      return;
    }

    this.isDeleting = true;

    this.emailAccountService
      .delete(this.selectedEmailAccount.id)
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

            this.getEmailAccountList();
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
    this.getEmailAccountList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getEmailAccountList();
  }

}