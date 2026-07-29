import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { empty } from 'rxjs';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../../core/services/master/user-type.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-type-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, TableToolbar, Pagination],
  templateUrl: './user-type-list.html',
  styleUrl: './user-type-list.scss',
})
export class UserTypeList {

  constructor(private router: Router, private userTypeService: UserTypeService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  userType: any[] = [];

  filteredUserType: any[] = [];

  ngOnInit(): void {

    this.getUserTypeList();

  }


  getUserTypeList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.userTypeService
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

  searchUserType(value: string): void {

    this.search = value.trim();

    this.pageNumber = 1;

    this.getUserTypeList();

  }

  addUserType() {

    this.router.navigate(['/user-type/add']);

  }
  editUserType(id: number): void {

    this.router.navigate(['/user-type/update', id]);

  }

  showDeleteDialog = false;

  selectedUserType: any = null;

  isDeleting = false;

  openDeleteDialog(asset: any): void {

    this.selectedUserType = asset;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedUserType = null;

  }

  deleteUserType(): void {

    if (!this.selectedUserType) {
      return;
    }

    this.isDeleting = true;

    this.userTypeService
      .delete(this.selectedUserType.id)
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
            this.getUserTypeList();

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

    this.getUserTypeList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getUserTypeList();

  }

}
