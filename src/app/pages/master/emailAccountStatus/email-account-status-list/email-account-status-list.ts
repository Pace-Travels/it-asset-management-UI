import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailAccountStatusService } from '../../../../core/services/master/email-account-status.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-email-account-status-list',
  imports: [CommonModule, PageHeader, EmptyState, ConfirmationDialog, TableToolbar, Pagination],
  templateUrl: './email-account-status-list.html',
  styleUrl: './email-account-status-list.scss',
})
export class EmailAccountStatusList {

  constructor(private router: Router, private emailAccStatusService: EmailAccountStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  emailAccStatus: any[] = [];

  filteredEmailAccStatus: any[] = [];

  ngOnInit(): void {

    this.getEmailAccStatusList();

  }


  getEmailAccStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.emailAccStatusService
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

  searchMailAccStatus(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getEmailAccStatusList();

  }

  addMailAccStatus() {

    this.router.navigate(['/email-account-status/add']);

  }
  editMailAccStatus(id: number): void {

    this.router.navigate(['/email-account-status/update', id]);

  }

  showDeleteDialog = false;

  selectedMailAccStatus: any = null;

  isDeleting = false;

  openDeleteDialog(mailAccStatusData: any): void {

    this.selectedMailAccStatus = mailAccStatusData;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedMailAccStatus = null;

  }

  deleteMailAccStatus(): void {

    if (!this.selectedMailAccStatus) {
      return;
    }

    this.isDeleting = true;

    this.emailAccStatusService
      .delete(this.selectedMailAccStatus.id)
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
            this.getEmailAccStatusList();

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

    this.getEmailAccStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getEmailAccStatusList();

  }

}
