import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetInformationCategory } from '../../../../core/services/master/asset-information-category';

@Component({
  selector: 'app-asset-information-category-list',
  imports: [CommonModule, PageHeader, TableToolbar, EmptyState, ConfirmationDialog, Pagination],
  templateUrl: './asset-information-category-list.html',
  styleUrl: './asset-information-category-list.scss',
})
export class AssetInformationCategoryList {



  constructor(private router: Router, private assetInfoStatusCategpry:AssetInformationCategory , private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  editAsset(id: string) {
    this.router.navigate(['/asset-info-status/edit', id]);
  }

  viewAsset(id: number) {
    this.router.navigate(['/asset-info-status/view', id]);
  }

  assetInformationCategory: any[] = [];

  filteredAssetInformationCategory: any[] = [];

  ngOnInit(): void {

    this.getAssetInfoCategoryList();

  }


  getAssetInfoCategoryList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.assetInfoStatusCategpry
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

  searchAsset(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getAssetInfoCategoryList();

  }

  addAsset() {
    this.router.navigate(['/asset-info-categaory/add']);
  }

  editAssetStatus(id: number): void {
    this.router.navigate(['/asset-info-categaory/update', id]);
  }

  showDeleteDialog = false;
  selectedAsset: any = null;
  isDeleting = false;

  openDeleteDialog(asset: any): void {
    this.selectedAsset = asset;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedAsset = null;
  }

  deleteAsset(): void {
    if (!this.selectedAsset) {
      return;
    }

    this.isDeleting = true;

    this.assetInfoStatusCategpry
      .delete(this.selectedAsset.id)
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
            this.getAssetInfoCategoryList();

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
    this.getAssetInfoCategoryList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getAssetInfoCategoryList();
  }

}
