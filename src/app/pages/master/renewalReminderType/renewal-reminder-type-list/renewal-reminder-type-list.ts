import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RenewalReminderTypeService } from '../../../../core/services/master/renewal-reminder-type.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-renewal-reminder-type-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, Pagination, TableToolbar],
  templateUrl: './renewal-reminder-type-list.html',
  styleUrl: './renewal-reminder-type-list.scss',
})
export class RenewalReminderTypeList {

  constructor(private router: Router, private renewalReminderTypeService: RenewalReminderTypeService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  renewalRemType: any[] = [];

  filteredRenewalRemType: any[] = [];

  ngOnInit(): void {

    this.getRenewalRemTypeList();

  }


  getRenewalRemTypeList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.renewalReminderTypeService
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

  searchRenewalRemType(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getRenewalRemTypeList();

  }

  addRenewalRemType() {

    this.router.navigate(['/renewal-reminder-type/add']);

  }
  editRenewalRemType(id: number): void {

    this.router.navigate(['/renewal-reminder-type/update', id]);

  }

  showDeleteDialog = false;

  selectedRenewalRemType: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedRenewalRemType = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedRenewalRemType = null;

  }

  deleteRenewalRemType(): void {

    if (!this.selectedRenewalRemType) {
      return;
    }

    this.isDeleting = true;

    this.renewalReminderTypeService
      .delete(this.selectedRenewalRemType.id)
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
            this.getRenewalRemTypeList();

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

    this.getRenewalRemTypeList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getRenewalRemTypeList();

  }

}
