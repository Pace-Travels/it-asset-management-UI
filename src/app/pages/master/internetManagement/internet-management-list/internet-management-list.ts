import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { InternetManagementServices } from '../../../../core/services/master/internet-management.services';

@Component({
  selector: 'app-internet-management-list',
  standalone: true,
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './internet-management-list.html',
  styleUrl: './internet-management-list.scss',
})
export class InternetManagementList implements OnInit {

  tableData: any[] = [];
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;
  search = '';

  showDeleteDialog = false;
  selectedInternet: any = null;
  isDeleting = false;

  constructor(
    private router: Router,
    private internetManagementService: InternetManagementServices,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getInternetList();
  }

  getInternetList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.internetManagementService
      .getList(payload)
      .subscribe({
        next: (response) => {
          this.loading = false;

          if (response?.success) {
            this.tableData = [...response.data];
            this.totalRecords = response.pagination?.totalRecords || 0;
            this.totalPages = response.pagination?.totalPages || 0;
            this.pageNumber = response.pagination?.currentPage || 1;
            this.pageSize = response.pagination?.pageSize || 10;
            this.cdr.detectChanges();
          }
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  searchInternet(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getInternetList();
  }

  addInternet(): void {
    this.router.navigate(['/internet-management/add']);
  }

  editInternet(id: number): void {
    this.router.navigate(['/internet-management/update', id]);
  }

  openDeleteDialog(item: any): void {
    this.selectedInternet = item;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedInternet = null;
  }

  deleteInternet(): void {
    if (!this.selectedInternet) {
      return;
    }

    this.isDeleting = true;

    this.internetManagementService
      .delete(this.selectedInternet.id)
      .subscribe({
        next: (response) => {
          this.isDeleting = false;

          if (response?.success) {
            this.closeDeleteDialog();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Internet Connection details deleted successfully'
            });

            this.getInternetList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Failed to delete record'
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

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageNumber = page;
    this.getInternetList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getInternetList();
  }

}