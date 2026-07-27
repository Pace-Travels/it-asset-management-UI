import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MobileRechargeStatusService } from '../../../../core/services/master/mobile-recharge-status.service';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-mobile-recharge-status-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, Pagination, EmptyState, TableToolbar],
  templateUrl: './mobile-recharge-status-list.html',
  styleUrl: './mobile-recharge-status-list.scss',
})
export class MobileRechargeStatusList {

  constructor(private router: Router, private mobileRechargeStatusService: MobileRechargeStatusService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  mobileRechargeStatus: any[] = [];

  filteredMobileRechargeStatus: any[] = [];

  ngOnInit(): void {

    this.getMobileRechargeStatusList();

  }


  getMobileRechargeStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.mobileRechargeStatusService
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

  searchMobileRechargeStatus(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getMobileRechargeStatusList();

  }

  addMobileRechargeStatus() {

    this.router.navigate(['/mobile-recharge-status/add']);

  }
  editMobileRechargeStatus(id: number): void {

    this.router.navigate(['/mobile-recharge-status/update', id]);

  }

  showDeleteDialog = false;

  selectedMobileRechargeStatus: any = null;

  isDeleting = false;

  openDeleteDialog(MobileRechargeStatusData: any): void {

    this.selectedMobileRechargeStatus = MobileRechargeStatusData;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedMobileRechargeStatus = null;

  }

  deleteMobileRechargeStatus(): void {

    if (!this.selectedMobileRechargeStatus) {
      return;
    }

    this.isDeleting = true;

    this.mobileRechargeStatusService
      .delete(this.selectedMobileRechargeStatus.id)
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
            this.getMobileRechargeStatusList();

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

    this.getMobileRechargeStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getMobileRechargeStatusList();

  }

}
