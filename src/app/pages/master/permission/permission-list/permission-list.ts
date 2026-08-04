import { ChangeDetectorRef, Component } from '@angular/core';
import { Router} from '@angular/router';
import { Permission } from '../../../../core/services/master/permission';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-permission-list',
  imports: [CommonModule, EmptyState, TableToolbar, ConfirmationDialog, Pagination, PageHeader],
  templateUrl: './permission-list.html',
  styleUrl: './permission-list.scss',
})
export class PermissionList {

  constructor(private router: Router, private permissionServie: Permission, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  permission: any[] = [];

  filteredPermission: any[] = [];

  ngOnInit(): void {

    this.getPermission();

  }


  getPermission(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.permissionServie
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

  searchPermission(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getPermission();

  }

  addPermission() {

    this.router.navigate(['/permission/add']);

  }
  editPermission(id: number): void {

    this.router.navigate(['/permission/update', id]);

  }

  showDeleteDialog = false;

  selectedPermission: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedPermission = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedPermission = null;

  }

  deletePermission(): void {

    if (!this.selectedPermission) {
      return;
    }

    this.isDeleting = true;

    this.permissionServie
      .delete(this.selectedPermission.id)
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
            this.getPermission();

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

    this.getPermission();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getPermission();

  }

}
