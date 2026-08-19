import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../core/services/auths/admin.service';

@Component({
  selector: 'app-admin-list',
  imports: [CommonModule, TableToolbar, ConfirmationDialog, EmptyState, PageHeader],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.scss',
})
export class AdminList {

  constructor(private router: Router, private adminService: AdminService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  editAdmin(id: string) {
    this.router.navigate(['/adminUser/update', id]);
  }

  viewAdmin(id: number) {
    this.router.navigate(['/adminUser/view', id]);
  }

  Admins: any[] = [];

  filteredAdmins: any[] = [];

  ngOnInit(): void {

    this.getAdminInfoStatusList();

  }


  getAdminInfoStatusList(): void {

    this.loading = true;

    const payload = {

      pageNumber: this.pageNumber,

      pageSize: this.pageSize,

      search: this.search

    };

    console.log(payload);

    this.adminService
      .getList(payload)
      .subscribe({

        next: (response) => {

          console.log('Current Page:', response.pagination.currentPage);
          console.table(response.data);
          this.tableData = [...response.data];

          console.log(this.tableData);


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

  // searchAdmin(value: string) {
  //   const search = value.toLowerCase();

  //   this.filteredAdmins = this.Admins.filter(Admin =>
  //     Admin.name.toLowerCase().includes(search) ||
  //     Admin.description.toLowerCase().includes(search)
  //   );

  // }

  searchAdmin(value: string): void {

    this.search = value.trim();

    console.log('Search Value :', this.search);

    this.pageNumber = 1;

    this.getAdminInfoStatusList();

  }

  addAdmin() {

    this.router.navigate(['/adminUser/add']);

  }
  editAdminStatus(id: number): void {

    this.router.navigate(['/adminUser/update', id]);

  }

  showDeleteDialog = false;

  selectedAdmin: any = null;

  isDeleting = false;

  openDeleteDialog(Admin: any): void {

    this.selectedAdmin = Admin;

    this.showDeleteDialog = true;

  }

  closeDeleteDialog(): void {

    this.showDeleteDialog = false;

    this.selectedAdmin = null;

  }

  deleteAdmin(): void {

    if (!this.selectedAdmin) {
      return;
    }

    this.isDeleting = true;

    this.adminService
      .delete(this.selectedAdmin.id)
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
            this.getAdminInfoStatusList();

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

    this.getAdminInfoStatusList();

  }

  onPageSizeChange(size: number): void {

    this.pageSize = size;

    this.pageNumber = 1;

    this.getAdminInfoStatusList();

  }

}
