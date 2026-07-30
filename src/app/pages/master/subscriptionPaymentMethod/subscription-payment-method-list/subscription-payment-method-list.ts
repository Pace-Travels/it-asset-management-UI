import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionPaymentMethod } from '../../../../core/services/master/subscription-payment-method';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-subscription-payment-method-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, Pagination, EmptyState, TableToolbar],
  templateUrl: './subscription-payment-method-list.html',
  styleUrl: './subscription-payment-method-list.scss',
})
export class SubscriptionPaymentMethodList {

  constructor(private router: Router, private subsPaymentMethodService: SubscriptionPaymentMethod, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  subsPaymentMethod: any[] = [];

  filteredsubsPaymentMethod: any[] = [];

  ngOnInit(): void {

    this.getSubsPaymentMethodList();

  }


  getSubsPaymentMethodList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.subsPaymentMethodService
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

  searchSubsPaymentMethod(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getSubsPaymentMethodList();

  }

  addSubsPaymentMethod() {

    this.router.navigate(['/subscription-payment-method/add']);

  }
  editSubsPaymentMethod(id: number): void {

    this.router.navigate(['/subscription-payment-method/update', id]);

  }

  showDeleteDialog = false;

  selectedSubsPaymentMethod: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedSubsPaymentMethod = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedSubsPaymentMethod = null;

  }

  deleteSubsPaymentMethod(): void {

    if (!this.selectedSubsPaymentMethod) {
      return;
    }

    this.isDeleting = true;

    this.subsPaymentMethodService
      .delete(this.selectedSubsPaymentMethod.id)
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
            this.getSubsPaymentMethodList();

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

    this.getSubsPaymentMethodList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getSubsPaymentMethodList();

  }

}
