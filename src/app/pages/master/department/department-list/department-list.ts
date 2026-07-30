import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from '../../../../core/services/master/department';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule, PageHeader, ConfirmationDialog, EmptyState, Pagination, TableToolbar],
  templateUrl: './department-list.html',
  styleUrl: './department-list.scss',
})
export class DepartmentList {

  constructor(private router: Router, private departmentServie: Department, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  department: any[] = [];

  filteredDepartment: any[] = [];

  ngOnInit(): void {

    this.getDepartmentList();

  }


  getDepartmentList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    this.departmentServie
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

  searchDepartment(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getDepartmentList();

  }

  addDepartment() {

    this.router.navigate(['/department/add']);

  }
  editDepartment(id: number): void {

    this.router.navigate(['/department/update', id]);

  }

  showDeleteDialog = false;

  selectedDepartment: any = null;

  isDeleting = false;

  openDeleteDialog(DepartmentData: any): void {

    this.selectedDepartment = DepartmentData;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedDepartment = null;

  }

  deleteDepartment(): void {

    if (!this.selectedDepartment) {
      return;
    }

    this.isDeleting = true;

    this.departmentServie
      .delete(this.selectedDepartment.id)
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
            this.getDepartmentList();

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

    this.getDepartmentList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getDepartmentList();

  }

}
