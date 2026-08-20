import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DomainWebsiteManagementService } from '../../../../core/services/master/domain-website-management.service';

@Component({
  selector: 'app-domain-website-management-list',
  imports: [
    PageHeader, 
    TableToolbar, 
    EmptyState, 
    Pagination, 
    ConfirmationDialog, 
    CommonModule
  ],
  templateUrl: './domain-website-management-list.html',
  styleUrl: './domain-website-management-list.scss',
})
export class DomainWebsiteManagementList implements OnInit {

  constructor(
    private router: Router, 
    private domainWebsiteService: DomainWebsiteManagementService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDomainList();
  }

  getDomainList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.domainWebsiteService
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

  searchDomain(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getDomainList();
  }

  addDomain(): void {
    this.router.navigate(['/domain-website-management/add']);
  }

  editDomain(id: number): void {
    this.router.navigate(['/domain-website-management/update', id]);
  }

  showDeleteDialog = false;
  selectedDomain: any = null;
  isDeleting = false;

  openDeleteDialog(domain: any): void {
    this.selectedDomain = domain;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedDomain = null;
  }

  deleteDomain(): void {
    if (!this.selectedDomain) {
      return;
    }

    this.isDeleting = true;

    this.domainWebsiteService
      .delete(this.selectedDomain.id)
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

            this.getDomainList();
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

  // Pagination & Table Control Data
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
    this.getDomainList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getDomainList();
  }

}