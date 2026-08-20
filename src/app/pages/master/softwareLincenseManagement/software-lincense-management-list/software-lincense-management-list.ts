import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { SoftwareLinceseManagementService } from '../../../../core/services/master/software-lincese-management.service';

@Component({
  selector: 'app-software-license-management-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './software-lincense-management-list.html',
  styleUrl: './software-lincense-management-list.scss',
})
export class SoftwareLicenseManagementList implements OnInit {

  constructor(
    private router: Router,
    private softwareLicenseService: SoftwareLinceseManagementService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSoftwareLicense();
  }

  getSoftwareLicense(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.softwareLicenseService
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

  searchSoftwareLicense(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getSoftwareLicense();
  }

  addSoftwareLicense(): void {
    this.router.navigate(['/software-license-management/add']);
  }

  editSoftwareLicense(id: number): void {
    this.router.navigate(['/software-license-management/update', id]);
  }

  showDeleteDialog = false;
  selectedLicense: any = null;
  isDeleting = false;

  openDeleteDialog(license: any): void {
    this.selectedLicense = license;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedLicense = null;
  }

  deleteSoftwareLicense(): void {
    if (!this.selectedLicense) {
      return;
    }

    this.isDeleting = true;

    this.softwareLicenseService
      .delete(this.selectedLicense.id)
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

            this.getSoftwareLicense();
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
    this.getSoftwareLicense();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getSoftwareLicense();
  }

}