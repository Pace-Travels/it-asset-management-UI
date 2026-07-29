import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminTypeService } from '../../../../core/services/master/admin-type.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-admin-type-list',
  imports: [CommonModule, ConfirmationDialog, EmptyState, TableToolbar, PageHeader, Pagination],
  templateUrl: './admin-type-list.html',
  styleUrl: './admin-type-list.scss',
})
export class AdminTypeList {

  constructor(private router: Router, private adminTypeService: AdminTypeService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  adminType: any[] = [];

  filteredAdminType: any[] = [];

  ngOnInit(): void {

    this.getAdminTypeList();

  }


  getAdminTypeList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.adminTypeService
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

  searchAdminType(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getAdminTypeList();

  }

  addAdminType() {

    this.router.navigate(['/admin-type/add']);

  }
  editAdminType(id: number): void {

    this.router.navigate(['/admin-type/update', id]);

  }

  showDeleteDialog = false;

  selectedAdminType: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedAdminType = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedAdminType = null;

  }

  deleteAdminType(): void {

    if (!this.selectedAdminType) {
      return;
    }

    this.isDeleting = true;

    this.adminTypeService
      .delete(this.selectedAdminType.id)
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
            this.getAdminTypeList();

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

    this.getAdminTypeList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getAdminTypeList();

  }

}
