import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionReminderType } from '../../../../core/services/master/subscription-reminder-type';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-subscription-reminder-type-list',
  imports: [CommonModule, ConfirmationDialog, EmptyState, Pagination, TableToolbar, PageHeader],
  templateUrl: './subscription-reminder-type-list.html',
  styleUrl: './subscription-reminder-type-list.scss',
})
export class SubscriptionReminderTypeList {

  constructor(private router: Router, private subsReminderTypeService: SubscriptionReminderType, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  subsReminderType: any[] = [];

  filteredSubsReminderType: any[] = [];

  ngOnInit(): void {

    this.getSubsReminderTypeList();

  }


  getSubsReminderTypeList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.subsReminderTypeService
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

  searchSubsReminderType(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getSubsReminderTypeList();

  }

  addSubsReminderType() {

    this.router.navigate(['/subscription-reminder-type/add']);

  }
  editSubsReminderType(id: number): void {

    this.router.navigate(['/subscription-reminder-type/update', id]);

  }

  showDeleteDialog = false;

  selectedSubsReminderType: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedSubsReminderType = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedSubsReminderType = null;

  }

  deleteSubsReminderType(): void {

    if (!this.selectedSubsReminderType) {
      return;
    }

    this.isDeleting = true;

    this.subsReminderTypeService
      .delete(this.selectedSubsReminderType.id)
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
            this.getSubsReminderTypeList();

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

    this.getSubsReminderTypeList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getSubsReminderTypeList();

  }

}
