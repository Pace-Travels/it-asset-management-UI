import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CloudSubscriptionServiceService } from '../../../../core/services/master/cloud-subscription-service.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-cloud-subscription-service-list',
  imports: [CommonModule, PageHeader, EmptyState, TableToolbar, ConfirmationDialog, Pagination],
  templateUrl: './cloud-subscription-service-list.html',
  styleUrl: './cloud-subscription-service-list.scss',
})
export class CloudSubscriptionServiceList {

  constructor(private router: Router, private cloudSubsServiceService: CloudSubscriptionServiceService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  cloudSubsService: any[] = [];

  filteredCloudSubsService: any[] = [];

  ngOnInit(): void {

    this.getCloudSeubsServiceList();

  }


  getCloudSeubsServiceList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.cloudSubsServiceService
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

  searchCloudSubsService(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getCloudSeubsServiceList();

  }

  addCloudSubsService() {

    this.router.navigate(['/email-account-status/add']);

  }
  editCloudSubsService(id: number): void {

    this.router.navigate(['/email-account-status/update', id]);

  }

  showDeleteDialog = false;

  selectedCloudSubsService: any = null;

  isDeleting = false;

  openDeleteDialog(cloudSubsServiceData: any): void {

    this.selectedCloudSubsService = cloudSubsServiceData;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedCloudSubsService = null;

  }

  deleteCloudSubsService(): void {

    if (!this.selectedCloudSubsService) {
      return;
    }

    this.isDeleting = true;

    this.cloudSubsServiceService
      .delete(this.selectedCloudSubsService.id)
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
            this.getCloudSeubsServiceList();

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

    this.getCloudSeubsServiceList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getCloudSeubsServiceList();

  }

}
