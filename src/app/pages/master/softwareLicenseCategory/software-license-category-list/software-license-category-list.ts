import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Router } from '@angular/router';
import { SoftwareLicenseCategoryService } from '../../../../core/services/master/software-license-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-software-license-category-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, Pagination, EmptyState, TableToolbar],
  templateUrl: './software-license-category-list.html',
  styleUrl: './software-license-category-list.scss',
})
export class SoftwareLicenseCategoryList {

  constructor(private router: Router, private softwareLicenseCategoryServices: SoftwareLicenseCategoryService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }


  softwareLicenseCategory: any[] = [];

  filteredSoftwareLicenseCategory: any[] = [];

  ngOnInit(): void {

    this.getSoftwareLicenseCategoryList();

  }


  getSoftwareLicenseCategoryList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.softwareLicenseCategoryServices
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

  searchSoftwareLicenseCategory(value: string): void {

    this.search = value.trim();
    this.pageNumber = 1;
    this.getSoftwareLicenseCategoryList();

  }

  addSoftwareLicenseCategory() {
    this.router.navigate(['/software-license-category/add']);
  }

  editSoftwareLicenseCategory(id: number): void {
    this.router.navigate(['/software-license-category/update', id]);
  }

  showDeleteDialog = false;
  selectedSoftwareLinceseCate: any = null;
  isDeleting = false;

  openDeleteDialog(asset: any): void {
    this.selectedSoftwareLinceseCate = asset;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedSoftwareLinceseCate = null;
  }

  deleteSoftwareLicenseCate(): void {
    if (!this.selectedSoftwareLinceseCate) {
      return;
    }

    this.isDeleting = true;

    this.softwareLicenseCategoryServices
      .delete(this.selectedSoftwareLinceseCate.id)
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
            this.getSoftwareLicenseCategoryList();

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
    this.getSoftwareLicenseCategoryList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getSoftwareLicenseCategoryList();
  }

}
