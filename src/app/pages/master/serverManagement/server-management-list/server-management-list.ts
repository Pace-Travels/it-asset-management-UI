import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { ServerManagementService } from '../../../../core/services/master/server-management.service';

@Component({
  selector: 'app-server-management-list',
  imports: [
    PageHeader, 
    TableToolbar, 
    EmptyState, 
    Pagination, 
    ConfirmationDialog, 
    CommonModule
  ],
  templateUrl: './server-management-list.html',
  styleUrl: './server-management-list.scss',
})
export class ServerManagementList implements OnInit {

  constructor(
    private router: Router, 
    private serverManagementService: ServerManagementService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getServerList();
  }

  getServerList(): void {
    this.loading = true;

    const payload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    };

    this.serverManagementService
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

  searchServer(value: string): void {
    this.search = value.trim();
    this.pageNumber = 1;
    this.getServerList();
  }

  addServer(): void {
    this.router.navigate(['/server-management/add']);
  }

  editServer(id: number): void {
    this.router.navigate(['/server-management/update', id]);
  }

  showDeleteDialog = false;
  selectedServer: any = null;
  isDeleting = false;

  openDeleteDialog(server: any): void {
    this.selectedServer = server;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedServer = null;
  }

  deleteServer(): void {
    if (!this.selectedServer) {
      return;
    }

    this.isDeleting = true;

    this.serverManagementService
      .delete(this.selectedServer.id)
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

            this.getServerList();
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

  // Pagination & Table Properties
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
    this.getServerList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getServerList();
  }

}