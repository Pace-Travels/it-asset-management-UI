import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorManagmentService } from '../../../../core/services/master/vendor-managment.service';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-vendor-management-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, TableToolbar, Pagination],
  templateUrl: './vendor-management-list.html',
  styleUrl: './vendor-management-list.scss',
})
export class VendorManagementList implements OnInit {

  constructor(
    private router: Router, 
    private vendorManagementService: VendorManagmentService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef
  ) { }

  vendorList: any[] = [];

  filteredVendorList: any[] = [];

  ngOnInit(): void {

    this.getVendorList();

  }


  getVendorList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.vendorManagementService
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

  searchVendor(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getVendorList();

  }

  addVendor() {

    this.router.navigate(['/vendor-management/add']);

  }

  editVendor(id: number): void {

    this.router.navigate(['/vendor-management/update', id]);

  }

  showDeleteDialog = false;

  selectedVendor: any = null;

  isDeleting = false;

  openDeleteDialog(vendor: any): void {

    this.selectedVendor = vendor;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedVendor = null;

  }

  deleteVendor(): void {

    if (!this.selectedVendor) {
      return;
    }

    this.isDeleting = true;

    this.vendorManagementService
      .delete(this.selectedVendor.id)
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
            this.getVendorList();

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

    this.getVendorList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getVendorList();

  }

}