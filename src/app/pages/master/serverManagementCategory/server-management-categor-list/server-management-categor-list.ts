import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Router } from '@angular/router';
import { ServerManagementCategoryService } from '../../../../core/services/master/server-management-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-server-management-categor-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, Pagination, TableToolbar, EmptyState],
  templateUrl: './server-management-categor-list.html',
  styleUrl: './server-management-categor-list.scss',
})
export class ServerManagementCategorList {

  constructor(private router: Router, private serverMangCategoryService: ServerManagementCategoryService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }


  serverMangCategory: any[] = [];

  filteredServerMangCategory: any[] = [];

  ngOnInit(): void {

    this.getServerManagmentCategoryList();

  }


  getServerManagmentCategoryList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.serverMangCategoryService
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

  searchserveMangCate(value: string): void {

    this.search = value.trim();
    this.pageNumber = 1;
    this.getServerManagmentCategoryList();

  }

  addserveMangCate() {
    this.router.navigate(['/server-mngt-category/add']);
  }

  editserveMangCateStatus(id: number): void {
    this.router.navigate(['/server-mngt-category/update', id]);
  }

  showDeleteDialog = false;
  selectedServeMangCate: any = null;
  isDeleting = false;

  openDeleteDialog(asset: any): void {
    this.selectedServeMangCate = asset;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedServeMangCate = null;
  }

  deleteServeMangCate(): void {
    if (!this.selectedServeMangCate) {
      return;
    }

    this.isDeleting = true;

    this.serverMangCategoryService
      .delete(this.selectedServeMangCate.id)
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
            this.getServerManagmentCategoryList();

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
    this.getServerManagmentCategoryList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getServerManagmentCategoryList();
  }

}
