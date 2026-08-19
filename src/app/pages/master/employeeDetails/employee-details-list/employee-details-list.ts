import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmployeeDetailsService } from '../../../../core/services/master/employee-details.service';

@Component({
  selector: 'app-employee-details-list',
  imports: [
    PageHeader, 
    TableToolbar, 
    EmptyState, 
    Pagination, 
    ConfirmationDialog, 
    CommonModule
  ],
  templateUrl: './employee-details-list.html',
  styleUrl: './employee-details-list.scss',
})
export class EmployeeDetailsList implements OnInit {

  constructor(
    private router: Router, 
    private employeeDetailsService: EmployeeDetailsService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef
  ) { }

  employeeList: any[] = [];
  filteredEmployeeList: any[] = [];

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.employeeDetailsService
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

  searchEmployee(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getEmployeeList();
  }

  addEmployee(): void {
    this.router.navigate(['/employee-details/add']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employee-details/update', id]);
  }

  showDeleteDialog = false;
  selectedEmployee: any = null;
  isDeleting = false;

  openDeleteDialog(employee: any): void {
    this.selectedEmployee = employee;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedEmployee = null;
  }

  deleteEmployee(): void {
    if (!this.selectedEmployee) {
      return;
    }

    this.isDeleting = true;

    this.employeeDetailsService
      .delete(this.selectedEmployee.id)
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

            this.getEmployeeList();
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

  // Pagination Properties & Functions
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
    this.getEmployeeList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getEmployeeList();
  }

}